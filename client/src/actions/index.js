import _postAction from "./syncActions/post.action";
import _authAction from "./syncActions/auth.action";

export { _postAction as postAction };
export { _authAction as authAction };

export {
  asyncFetchAllPosts,
  asyncFetchSinglePost,
  asyncCreatePost,
  asyncUpdatePost,
  asyncDeletePost
} from "./asyncActions/post.async.action";

export {
  asyncLogin
} from './asyncActions/auth.async.action'
