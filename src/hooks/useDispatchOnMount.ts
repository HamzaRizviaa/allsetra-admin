import { useEffect } from "react";
import { useAppDispatch } from "hooks";
import { all, compose, isNil, not } from "ramda";

const hasAllArgs = all(compose(not, isNil));

/**
 * Calls fetch action creator if and only if all the argument is present.
 */
export default (actionCreator: (...args: any) => any, ...args: any[]) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (hasAllArgs(args)) {
      dispatch(actionCreator(...args));
    }
  }, [actionCreator, dispatch, ...args]);
};
