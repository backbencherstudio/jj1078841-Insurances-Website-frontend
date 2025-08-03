// Type for Payment Tracker items
export interface PaymentItem {
    acvStatus: string;
    depreciation: string;
    mortgageEndorsement: string;
    rcvStatus: string;
}

export interface ClaimSummary {
    claimNumber: string;
    status: string;
    carrier: string;
    adjuster: string;
    lastUpdated: string;
}

export interface DocumentHub {
    policyDocs: string;
    damagePhotos: string[];
    signedForms?: string;
    carrierCorrespondence?: string;
}

export interface DocumentHubItem {
    title: string;
    icon: React.ReactNode;
}

export interface ClaimDataType {
    claimSummary: ClaimSummary;
    documentHub: DocumentHub;
    paymentTracker: PaymentItem;
    claimTimeline: string;
}

// Type for Timeline items
export interface TimelineStep {
    name: string;
    description?: string;
    date?: string;
    completed?: boolean;
    active?: boolean;
}