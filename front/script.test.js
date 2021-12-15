import { testString } from "./utilities/callerAPI.js"

test('should be 2', () => {
    expect(testString()).toBe("test");
})
