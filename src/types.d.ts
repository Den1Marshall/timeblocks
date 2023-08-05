declare module 'use-long-press' {
  function useLongPress<
    Target extends Element = Element,
    Context = unknown,
    Callback extends LongPressCallback<Target, Context> = LongPressCallback<
      Target,
      Context
    >
  >(
    callback: Callback | null,
    options?: LongPressOptions<Target, Context>
  ): LongPressResult<LongPressHandlers<Target>, Context>;
  type LongPressCallback<
    Target extends Element = Element,
    Context = unknown
  > = (
    event: LongPressEvent<Target>,
    meta: LongPressCallbackMeta<Context>
  ) => void;
  export type LongPressCallbackMeta<Context = unknown> = {
    context?: Context;
    reason?: LongPressCallbackReason;
  };
}
