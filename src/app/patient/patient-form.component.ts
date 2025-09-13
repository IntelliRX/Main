import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FirebaseService } from '../common/services/firebase.service';
import { collection, getDocs, query, where, doc, setDoc } from 'firebase/firestore';

@Component({
  selector: 'app-patient-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './patient-form.component.html'
})
export class PatientFormComponent {
  patientForm: FormGroup;

  phoneSuggestions: string[] = [];
  memberSuggestions: any[] = [];
  showPhoneSuggestions = false;
  showMemberSuggestions = false;

  selectedPhone: string | null = null;

  constructor(private fb: FormBuilder, private firebase: FirebaseService) {
    this.patientForm = this.fb.group({
      id: [''],   // phone number
      data: this.fb.group({
        name: [''],
        dateOfBirth: [''],
        email: [''],
        presentIllness: this.fb.array([]),
        allergies: [''],
        details: this.fb.group({
          chiefComplaints: [''],
          examination: this.fb.array([]),
          diagnosis: [''],
          treatmentPlan: [''],
          medicines: this.fb.array([]),
          advice: ['']
        })
      })
    });
  }

  get presentIllness() {
    return this.patientForm.get('data.presentIllness') as FormArray;
  }

  addIllness(value = '') {
    this.presentIllness.push(this.fb.control(value));
  }

  get examination() {
    return this.patientForm.get('data.details.examination') as FormArray;
  }

  addExamination(testname = '', result = '') {
    this.examination.push(this.fb.group({ testname, result }));
  }

  get medicines() {
    return this.patientForm.get('data.details.medicines') as FormArray;
  }

  addMedicine(name = '', dosage = '', frequency = '') {
    this.medicines.push(this.fb.group({ name, dosage, frequency }));
  }

  removeExamination(index: number) {
    this.examination.removeAt(index);
  }

  removeMedicine(index: number) {
    this.medicines.removeAt(index);
  }

  // === Phone Autocomplete ===
  async searchPhones(event: any) {
    const value = event.target.value;
    if (!value) {
      this.showPhoneSuggestions = false;
      return;
    }

    try {
      const patientsRef = collection(this.firebase.firestore, 'patients');
      const snapshot = await getDocs(patientsRef);

      // filter locally (Firestore doesn’t support "startsWith" natively without indexing)
      this.phoneSuggestions = snapshot.docs
        .map(d => d.id)
        .filter(id => id.startsWith(value));

      this.showPhoneSuggestions = this.phoneSuggestions.length > 0;
    } catch (err) {
      console.error('Error fetching phones:', err);
    }
  }

  selectPhone(phone: string) {
    this.patientForm.patchValue({ id: phone });
    this.selectedPhone = phone;
    this.showPhoneSuggestions = false;
    this.memberSuggestions = [];
    this.showMemberSuggestions = false;
  }

  // === Member Autocomplete ===
  async searchMembers(event: any) {
    const value = event.target.value;
    if (!this.selectedPhone || !value) {
      this.showMemberSuggestions = false;
      return;
    }

    try {
      const membersRef = collection(this.firebase.firestore, `patients/${this.selectedPhone}/members`);
      const snapshot = await getDocs(membersRef);

      this.memberSuggestions = snapshot.docs
        .map(d => ({ id: d.id, ...d.data() }))
        .filter(m => m.id.toLowerCase().startsWith(value.toLowerCase()));

      this.showMemberSuggestions = this.memberSuggestions.length > 0;
    } catch (err) {
      console.error('Error fetching members:', err);
    }
  }

  selectMember(member: any) {
    this.patientForm.patchValue({
      data: {
        name: member.id,
        dateOfBirth: member.dateOfBirth || '',
        email: member.email || '',
        allergies: member.allergies || ''
      }
    });

    // reset & refill presentIllness
    this.presentIllness.clear();
    if (member.presentIllness) {
      member.presentIllness.forEach((ill: string) => this.addIllness(ill));
    }

    this.showMemberSuggestions = false;
  }


  async submit() {
    if (this.patientForm.valid) {
      const patientData = this.patientForm.value;
      const phone = patientData.id;
      const memberName = patientData.data.name;

      // split member-level and prescription-level data
      const memberData = {
        dateOfBirth: patientData.data.dateOfBirth,
        allergies: patientData.data.allergies,
        email: patientData.data.email,
        presentIllness: patientData.data.presentIllness
      };

      const prescriptionData = {
        details: patientData.data.details,
        createdAt: new Date().toISOString()
      };

      // unique prescription ID (timestamp-based)
      const guid = new Date().toISOString().replace(/[-:.TZ]/g, "");

      try {
        const patientRef = doc(this.firebase.firestore, "patients", phone);

        await setDoc(patientRef, {
          createdAt: new Date().toISOString()
        }, { merge: true });
        // 1. Save/update member data
        const memberRef = doc(
          this.firebase.firestore,
          `patients/${phone}/members/${memberName}`
        );
        await setDoc(memberRef, memberData, { merge: true });

        // 2. Save prescription under prescriptions/{guid}
        const prescriptionRef = doc(
          this.firebase.firestore,
          `patients/${phone}/members/${memberName}/prescriptions/${guid}`
        );
        await setDoc(prescriptionRef, prescriptionData);
        console.log('Saved at path:', `patients/${patientData.id}`);

        console.log("Firestore save successful.");
        const testSnap = await getDocs(collection(this.firebase.firestore, 'patients'));
        console.log("FIRESTORE docs count:", testSnap.size);
        testSnap.forEach(d => console.log("Firestore doc:", d.id, d.data()));

        alert(`Prescription saved for ${memberName}!`);
        this.patientForm.reset();
      } catch (err) {
        console.error('Firestore save error:', err);
        alert('Error saving patient, check console.');
      }
    } else {
      alert('Form invalid');
    }
  }
}