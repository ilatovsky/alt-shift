import { nanoid } from "nanoid";

export const generateNewApplicationLink = () => `/applications/${nanoid()}`;
