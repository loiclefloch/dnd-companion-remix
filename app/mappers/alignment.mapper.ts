import type { AlignmentApiObject } from "~/apiobjects/alignment.apiobject";
import type { AlignmentDto } from "~/dtos/alignment.dto";

export function transformAlignment(alignmentApiObject: AlignmentApiObject): AlignmentDto {
	return {
    index: alignmentApiObject.index,
    name: alignmentApiObject.name,
    abbreviation: alignmentApiObject.abbreviation,
    desc: alignmentApiObject.desc,
    url: alignmentApiObject.url,
  };
}
