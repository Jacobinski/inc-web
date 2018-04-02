import {toast} from "materialize-css";

export default class Toast {
    constructor(message = 'Data updated') {
        toast({html: `<span>${message}</span>`});
    }
}
