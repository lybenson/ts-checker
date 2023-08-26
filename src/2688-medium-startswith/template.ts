// type StartsWith<
//   T extends string,
//   U extends string
// > = U extends `${infer UL}${infer UR}`
//   ? T extends `${infer TL}${infer TR}`
//     ? UL extends TL
//       ? StartsWith<TR, UR>
//       : false
//     : false
//   : true

type StartsWith<T extends string, U extends string> = T extends `${U}${string}`
  ? true
  : false
