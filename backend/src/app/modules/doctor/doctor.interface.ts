export type IDoctorFilters = {
    searchTerm?: string;
    firstName?: string;
    lastName?: string;
    fullName?: string;
    gender?: string;
    city?: string;
    max?: string;
    min?: string;
    specialist?: string;
    degree?: string;
    designation?: string;
    clinicName?: string;
}
export const IDoctorFiltersData = ['searchTerm','firstName','lastName','gender','city', 'max', 'min', 'specialist', 'designation', 'clinicName', 'fullName']
export const IDoctorOptions = ['limit', 'page', 'sortBy', 'sortOrder']

export const DoctorSearchableFields = ['firstName', 'lastName', 'address', 'specialization', 'degree', 'city', 'designation', 'clinicName', 'fullName']