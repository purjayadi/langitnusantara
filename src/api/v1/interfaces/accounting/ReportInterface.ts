export interface trialBalance{
    name: string;
    subGroup?: [
        {
            name: string;
            account: [
                {
                    name: string;
                    debit: number;
                    credit: number;
                    balance: number;
                }
            ]
        }
    ];
    push?: any;
}