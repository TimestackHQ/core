import * as Joi from "joi";
import { CreateMediaType } from "./media.controller";
import { MEDIA_FORMAT_OPTIONS, MEDIA_HOLDER_TYPES, MEDIA_QUALITY_OPTIONS } from "../../shared/consts";

export const createMediaValidator = (body: CreateMediaType): Joi.ValidationResult => {

    const schema = Joi.object({
        exifTimestamp: Joi.string(),
        uploadLocalDeviceRef: Joi.string(),
        mediaQuality: Joi.string().valid(...MEDIA_QUALITY_OPTIONS).required(),
        mediaFormat: Joi.string().valid(...MEDIA_FORMAT_OPTIONS).required(),
        metadata: Joi.object(),
        holderId: Joi.string().required(),
        holderType: Joi.string().valid(...MEDIA_HOLDER_TYPES, "cover").required(),
        timestamp: Joi.date(),
    });

    return schema.validate(body);

};

export const deleteMemoriesValidator = (body: unknown): Joi.ValidationResult => {

    const schema = Joi.object({
        mediaId: Joi.string().required(),
        contentId: Joi.string().required(),
        holderId: Joi.string().required(),
        holderType: Joi.string().valid(...MEDIA_HOLDER_TYPES).required(),
    });
    return schema.validate(body);

}

export const linkContent = (body: unknown): Joi.ValidationResult => {

    const schema = Joi.object({
        ids: Joi.array().required(),
    });
    return schema.validate(body);

}

