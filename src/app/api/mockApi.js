import { delay } from "../helpers/util";
import { sampleData } from "./sampleData";

export const fetchSampleData = () => {
  return delay(1000).then(() => Promise.resolve(sampleData));
};
