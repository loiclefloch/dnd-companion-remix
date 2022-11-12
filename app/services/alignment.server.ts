import alignments from "~/database/data/alignments.json";
import type { AlignmentApiObject } from "../apiobjects/alignment.apiobject";
import { cloneDeep } from 'lodash';

export async function getAlignments(): Promise<Array<AlignmentApiObject>> {
  return cloneDeep(alignments);
}

export async function getAlignment(
  index: string
): Promise<AlignmentApiObject> {
  const alignment = alignments.find((b) => b.index === index);

  if (!alignment) {
    throw new Error(`Alignment not found for index ${index}`);
  }

  return cloneDeep(alignment);
}
