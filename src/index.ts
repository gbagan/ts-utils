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
