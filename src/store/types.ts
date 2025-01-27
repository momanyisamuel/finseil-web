
export interface Lead {
    id: string;
    agent: string;
    first_name: string;
    middle_name: string;
    last_name: string;
    phone_number: string;
    email: string;
    identification_number: string;
    KRA_PIN: string;
    requested_loan_amount: number;
    application_date: string;
    status: string;
}

export interface LeadInput {
    agent: string;
    first_name: string;
    middle_name: string;
    last_name: string;
    phone_number: string;
    email: string;
    identification_number: string;
    KRA_PIN: string;
    requested_loan_amount: number;
    application_date: string;
    status: string;
}

export interface UserInput {
    first_name: string;
    middle_name: string;
    last_name: string;
    phone_number: string;
    identification_number: string;
    password: string;
    username: string;
    MPESA_NUMBER: string;
    role: string;
    is_active: boolean;
    registration_date: string;
    two_fa_enabled?: boolean;
    two_fa_method?: string;
}

export interface Role {
    id: string;
    name: string;
    description: string;
}

export interface RoleInput {
    name: string;
    description: string;
}

export interface Action {
    action: string;
    timestamp: string;
}
export interface User {
    id: string;
    username: string;
    first_name: string;
    middle_name: string;
    last_name: string;
    phone_number: string;
    identification_number: string;
    MPESA_NUMBER: string;
    email: string;
    password: string;
    role: string;
    is_active: boolean;
    two_fa_enabled: boolean;
    two_fa_method: string;
    otp_secret: string;
    otp_uri: string;
    registration_date: string;
    actions: Action[];
    lead_count: number;
    agent_count: number;
}

export interface AgentInput {
    first_name: string;
    middle_name: string;
    last_name: string;
    phone_number: string;
    identification_number: string;
    MPESA_NUMBER: string;
    email: string;
}

export interface TWOFAData {
    message: string;
    otp_secret: string;
    otp_url: string;
}

export type SMSInput = {
    message: string;
    destination: string[];
    sender_id?: string;
}

export type IdVerificationResponse = {
    message: string;
    data: {
        code: string;
        response: {
            id: string;
            title: string;
            first_name: string;
            middle_name: string;
            last_name: string;
            gender: string;
            date_of_birth: string;
            place_of_birth: string;
            person_with_disability: number;
            citizenship: string;
            kra_pin: string;
            preferred_primary_care_network: string;
            employment_type: string;
            domestic_worker_type: string;
            civil_status: string;
            identification_type: string;
            identification_number: string;
            other_identifications: {
                identification_number: string;
                identification_type: string;
            }[];
            dependants: unknown[]; // Assuming empty array or array of unknown structure
            is_alive: number;
            deceased_datetime: string;
            phone: string;
            biometrics_verified: number;
            biometrics_score: number;
            email: string;
            country: string;
            county: string;
            sub_county: string;
            ward: string;
            village_estate: string;
            building_house_no: string;
            latitude: string;
            longitude: string;
            province_state_country: string;
            zip_code: string;
            identification_residence: string;
            employer_name: string;
            employer_pin: string;
            disability_category: string;
            disability_subcategory: string;
            disability_cause: string;
            in_lawful_custody: string;
            admission_remand_number: string;
            document_uploads: unknown[]; // Assuming empty array or array of unknown structure
            alternative_contacts: unknown[]; // Assuming empty array or array of unknown structure
            gross_income: number;
            gross_income_currency: string;
            postal_address: string;
            estimated_contribution: number;
            estimated_annual_contribution: number;
            city: string;
            id_serial: string;
            learning_institution_code: string;
            learning_institution_name: string;
            grade_level: string;
            unconfirmed_dependants: unknown[]; // Assuming empty array or array of unknown structure
            is_agent: number;
            agent_id: string;
        };
        id: string;
        api_data_id: string;
    };
};