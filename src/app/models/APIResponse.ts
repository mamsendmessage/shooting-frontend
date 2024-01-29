export class APIResponse {
    public result: number;
    public payload: any;
    public errorCode: number;
    public errorMessage: string;
    constructor() {
        this.result = -1;
        this.payload = null;
        this.errorCode = 0;
        this.errorMessage = "";
    }
}