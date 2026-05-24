/**
 * Returns an array of length n where every element is val.
 */
export const arrayOf = <A>(n: number, val: A): A[] => new Array(n).fill(val);

/**
 * Returns an array of length n where the i-th element is f(i).
 */
export const times = <A>(n: number, f: (i: number) => A): A[] => Array.from({ length: n }, (_, i) => f(i));

/**
 *  Returns an array of numbers from start (inclusive) to end (exclusive) with a step of step.
 * If step is not provided, it defaults to 1.
 */
export function range(start: number, end: number, step?: number): number[] {
  const res = [];
  step = step ?? 1;
  if (step > 0) {
    for (let i = start; i < end; i += step) {
      res.push(i);
    }
  } else {
    for (let i = start; i > end; i += step) {
      res.push(i);
    }
  }
  return res
}

/**
 * Returns an array of the results of applying f to each element of the input array,
 * excluding any null or undefined results.
 */
export function filterMap<A, B>(arr: readonly A[], f: (x: A, i: number) => B | null | undefined): B[] {
  const res: B[] = [];
  const n = arr.length;
  for (let i = 0; i < n; i++) {
    const x = f(arr[i]!, i);
    if (x != null) {
      res.push(x);
    }
  }
  return res;
}


/**
 * Counts the number of elements in the array that satisfy the given predicate.
 */
export function count<A>(arr: readonly A[], pred: (x: A, i: number) => boolean): number {
  let total = 0;
  const n = arr.length;
  for (let i = 0; i < n; i++) {
    if (pred(arr[i]!, i)) {
      total += 1;
    }
  }
  return total;
}

/**
 * Returns the element of the array that minimizes the given function. Returns null if the array is empty.
 */
export function minBy<A>(arr: readonly A[], fn: (x: A, i: number) => number): A | undefined {
  let min = undefined;
  let bestScore = Infinity;
  const n = arr.length;
  for (let i = 0; i < n; i++) {
    const x = arr[i]!;
    const score = fn(x, i);
    if (score < bestScore) {
      bestScore = score;
      min = x;
    } 
  }
  return min;
}

/**
 * Returns the element of the array that maximizes the given function. Returns null if the array is empty.
 */
export const maxBy = <A>(arr: readonly A[], fn: (x: A, i: number) => number) => minBy(arr, (x, i) => -fn(x, i))

/**
 * Returns an array of the elements of the input array that maximize the given function.
 * Returns an empty array if the input array is empty.
 */
export const maximaBy = <A>(arr: readonly A[], f: (a: A, i: number) => number): A[] => {
  let maxVal = -Infinity;
  const res: A[] = [];
  const n = arr.length;
  for (let i = 0; i < n; i++) {
    const a = arr[i]!;
    const val = f(a, i);
    if (val > maxVal) {
      maxVal = val;
      res.length = 0;
      res.push(a);
    } else if (val === maxVal) {
      res.push(a);
    }
  }
  return res;
}

/** 
 * Partitions the array into two arrays: the first contains the elements that satisfy the predicate,
 * and the second contains the elements that do not.
 */
export function partition<A>(xs: readonly A[], f: (x: A) => boolean): [A[], A[]] {
  const yes: A[] = [];
  const no: A[] = [];
  const n = xs.length;
  for (let i = 0; i < n; i++) {
    const x = xs[i]!;
    if (f(x)) { yes.push(x) } else  { no.push(x) };
  }
  return [yes, no];
}

/**
 * Returns the sum of all elements in an array.
 * Returns 0 for an empty array.
 */
export function sum(arr: readonly number[]): number {
  let total = 0;
  const n = arr.length;
  for (let i = 0; i < n; i++) {
    total += arr[i]!;
  }
  return total;
}

/**
 * Returns the sum of fn applied to each element of arr.
 * Returns 0 for an empty array.
 */
export function sumBy<A>(arr: readonly A[], fn: (val: A, i: number) => number): number {
  let total = 0;
  const n = arr.length;
  for (let i = 0; i < n; i++) {
    total += fn(arr[i]!, i);
  }
  return total;
}

/**
 * Combines two arrays element-by-element using a provided function,
 * stopping at the length of the shortest array.
 */
export function zipWith<A, B, C>(xs: A[], ys: B[], fn: (x: A, y: B) => C): C[] {
  const n = Math.min(xs.length, ys.length);
  const res = new Array(n);
  for (let i = 0; i < n; i++) {
    res[i] = fn(xs[i]!, ys[i]!);
  }
  return res;
}

type PathValue<T, P extends readonly (string | number)[]> =
  P extends readonly []
  ? T
  : P extends readonly [infer K, ...infer Rest extends (string | number)[]]
  ? K extends keyof T ? PathValue<T[K], Rest> : never
  : never;

/**
 * Returns a new object with the value at `path` replaced by `val`.
 * All other nodes are left untouched (shallow copies are made along the path).
 */
export function set<T, const  P extends readonly (string | number)[]>(
  obj: T,
  path: P,
  val: PathValue<T, P>
): T {
  return update(obj, path, () => val);
}

/**
 * Returns a new object with the value at `path` replaced by `updater(currentValue)`.
 * All other nodes are left untouched (shallow copies are made along the path).
 */
export function update<T, const P extends readonly (string | number)[]>(
  obj: T,
  path: P,
  updater: (x: PathValue<T, P>) => PathValue<T, P>
): T {
  const result: T = Array.isArray(obj) ? [...(obj as any)] : { ...(obj as any) };
  let current: any = result;

  for (let i = 0; i < path.length - 1; i++) {
    const key = path[i]!;
    current[key] = Array.isArray(current[key]) ? [...current[key]] : { ...current[key] };
    current = current[key];
  }

  const lastKey = path[path.length - 1]!;
  current[lastKey] = updater(current[lastKey]);

  return result;
}

/**
 * Clamps a value between a minimum and maximum bound.
 * Returns min if value is NaN.
 */
export function clamp(value: number, min: number, max: number) {
  if (isNaN(value)) return min;
  return Math.min(Math.max(value, min), max);
}

/**
 * Returns the quotient and remainder of n divided by m.
 * m must a positive integer. The remainder is always non-negative.
 */
export function divMod(n: number, m: number): [number, number] {
  const r = n % m;
  return [Math.floor(n / m), r < 0 ? r + m : r];
}

/**
 * Returns a promise that resolves after ms milliseconds.
 */
export const sleep = <A>(ms: number) => new Promise<A>(resolve => setTimeout(resolve, ms));
