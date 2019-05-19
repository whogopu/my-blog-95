import _postAction from "./syncActions/post.action";
import _authAction from "./syncActions/auth.action";

export { _postAction as postAction };
export { _authAction as authAction };

export {
  asyncFetchAllPosts,
  asyncFetchSinglePost
} from "./asyncActions/post.async.action";
