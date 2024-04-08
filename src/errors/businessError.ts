
class BusinessError extends Error {
    constructor(businessRuleDescription: string) {
        super(businessRuleDescription);
        this.name = "BusinessError";
    }
}

export default BusinessError