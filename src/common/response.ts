interface IAPIResponse {
    status_code: number;
    message: string;
    data?: any;
}

export default class APIResponse {
    public status_code: number;
  
    public message: string;
  
    public data?: any;
  
    constructor(props: IAPIResponse) {
      this.status_code = props.status_code;
      this.message = props.message;
      this.data = props.data;
    }
}
  