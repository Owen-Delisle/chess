export default class Assert {
    assert_type: AssertType
    result: AssertResult
    constructor(assert_type: AssertType, lhs: any, rhs: any) {
        this.assert_type = assert_type
        this.result = this.assert_result(assert_type, lhs, rhs)
    }

    private assert_result(assert_type: AssertType, lhs: any, rhs: any): AssertResult {
        return this.run_assert(assert_type, lhs, rhs) ? AssertResult.passed : AssertResult.failed
    }

    private run_assert(assert_type: AssertType, lhs: any, rhs: any): boolean {
        switch(assert_type) {
            case AssertType.equals:
                return this.equals(lhs, rhs)
            case AssertType.not_equals:
                return this.not_equals(lhs, rhs)
        }
    }

    private equals(lhs: any, rhs: any): boolean {
        return lhs === rhs
    }

    private not_equals(lhs: any, rhs: any): boolean {
        return lhs !== rhs
    }
}

export enum AssertType {
    equals,
    not_equals,
}

export enum AssertResult {
    passed = "passed",
    failed = "failed"
}