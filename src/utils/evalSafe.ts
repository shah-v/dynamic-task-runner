// Create a "safe" environment using Proxy
const createSandbox = (context: object) => {
  return new Proxy(context, {
    has(target, key) {
      return true;
    },
    get(target, key, receiver) {
      if (key === Symbol.unscopables) return undefined;

      if (key in target || key === "window") {
        return Reflect.get(target, key, receiver);
      }

      // Block access to anything outside
      throw new Error(`Access to '${String(key)}' is denied in sandbox`);
    },
  });
};

export const evalSafe = (code: string, context: object = {}) => {
  try {
    const sandbox = createSandbox(context);

    const fn = new Function(
      "sandbox",
      `with(sandbox) {
             "use strict"; // Enable strict mode to prevent leaks
             return (${code})
            }`
    );

    return fn(sandbox);
  } catch (error) {
    console.error("Eval error: ", error);
    return "undefined";
  }
};
