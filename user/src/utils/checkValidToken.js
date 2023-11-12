import { checkToken } from "./api";

async function checkValidToken(token,used_to) {
    const result = await checkToken(token,used_to);
    return result;
}

export default checkValidToken;