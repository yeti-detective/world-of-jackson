// THIS FILE IS AUTOMATICALLY GENERATED. DO NOT MODIFY IT.

import { Asset, Entry } from "contentful";
import { Document } from "@contentful/rich-text-types";

export interface IBuildingFields {
  /** Name */
  name: string;

  /** Latitude */
  latitutde: number;

  /** Longitude */
  longitude: number;

  /** Address */
  address?: { lat: number; lon: number } | undefined;

  /** Model */
  model?: Asset | undefined;

  /** Image */
  image?: Asset | undefined;

  /** Body */
  body?: Document | undefined;
}

export interface IBuilding extends Entry<IBuildingFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: "building";
        linkType: "ContentType";
        type: "Link";
      };
    };
  };
}

export interface IFeatureFields {
  /** Name */
  name: string;

  /** Description */
  description?: string | undefined;

  /** Body */
  body?: Document | undefined;
}

export interface IFeature extends Entry<IFeatureFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: "feature";
        linkType: "ContentType";
        type: "Link";
      };
    };
  };
}

export interface ILotFields {
  /** Name */
  name?: string | undefined;

  /** Coordinates */
  coordinates: Record<string, any>;

  /** Address */
  address?: { lat: number; lon: number } | undefined;

  /** Image */
  image?: Asset | undefined;

  /** Body */
  body?: Document | undefined;

  /** Buildings */
  buildings?: IBuilding | undefined;
}

export interface ILot extends Entry<ILotFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: "lot";
        linkType: "ContentType";
        type: "Link";
      };
    };
  };
}

export interface IMapFields {
  /** Map items */
  mapItems: (IBuilding | ILot | IZone)[];
}

export interface IMap extends Entry<IMapFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: "map";
        linkType: "ContentType";
        type: "Link";
      };
    };
  };
}

export interface IProjectFields {
  /** Name */
  name: string;

  /** Description */
  description?: string | undefined;

  /** Body */
  body?: Document | undefined;

  /** Child projects */
  projects?: IProject[] | undefined;

  /** getInvolvedLinks */
  getInvolvedLinks?: string[] | undefined;
}

export interface IProject extends Entry<IProjectFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: "project";
        linkType: "ContentType";
        type: "Link";
      };
    };
  };
}

export interface IZoneFields {
  /** Name */
  name?: string | undefined;

  /** Coordinates */
  coordinates: Record<string, any>;

  /** Image */
  image?: Asset | undefined;

  /** Body */
  body?: Document | undefined;

  /** Lots */
  lots?: ILot[] | undefined;
}

export interface IZone extends Entry<IZoneFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: "zone";
        linkType: "ContentType";
        type: "Link";
      };
    };
  };
}

export type CONTENT_TYPE =
  | "building"
  | "feature"
  | "lot"
  | "map"
  | "project"
  | "zone";

export type LOCALE_CODE = "en-US";

export type CONTENTFUL_DEFAULT_LOCALE_CODE = "en-US";
