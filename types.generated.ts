// Code generated by prismic-ts-codegen. DO NOT EDIT.

import type * as prismicT from "@prismicio/types";
import type * as prismic from "@prismicio/client";

type Simplify<T> = {
    [KeyType in keyof T]: T[KeyType];
};
/** Content for Landing Page documents */
interface LandingPageDocumentData {
    /**
     * Slice Zone field in *Landing Page*
     *
     * - **Field Type**: Slice Zone
     * - **Placeholder**: *None*
     * - **API ID Path**: landing_page.slices[]
     * - **Tab**: Main
     * - **Documentation**: https://prismic.io/docs/core-concepts/slices
     *
     */
    slices: prismicT.SliceZone<LandingPageDocumentDataSlicesSlice>;
}
/**
 * Slice for *Landing Page → Slice Zone*
 *
 */
type LandingPageDocumentDataSlicesSlice = HeroSlice;
/**
 * Landing Page document from Prismic
 *
 * - **API ID**: `landing_page`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/core-concepts/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type LandingPageDocument<Lang extends string = string> = prismicT.PrismicDocumentWithUID<Simplify<LandingPageDocumentData>, "landing_page", Lang>;
export type AllDocumentTypes = LandingPageDocument;
/**
 * Primary content in Hero → Primary
 *
 */
interface HeroSliceDefaultPrimary {
    /**
     * Title field in *Hero → Primary*
     *
     * - **Field Type**: Title
     * - **Placeholder**: This is where it all begins...
     * - **API ID Path**: hero.primary.title
     * - **Documentation**: https://prismic.io/docs/core-concepts/rich-text-title
     *
     */
    title: prismicT.TitleField;
    /**
     * Description field in *Hero → Primary*
     *
     * - **Field Type**: Rich Text
     * - **Placeholder**: A nice description of your feature
     * - **API ID Path**: hero.primary.description
     * - **Documentation**: https://prismic.io/docs/core-concepts/rich-text-title
     *
     */
    description: prismicT.RichTextField;
}
/**
 * Default variation for Hero Slice
 *
 * - **API ID**: `default`
 * - **Description**: `Hero`
 * - **Documentation**: https://prismic.io/docs/core-concepts/reusing-slices
 *
 */
export type HeroSliceDefault = prismicT.SharedSliceVariation<"default", Simplify<HeroSliceDefaultPrimary>, never>;
/**
 * Slice variation for *Hero*
 *
 */
type HeroSliceVariation = HeroSliceDefault;
/**
 * Hero Shared Slice
 *
 * - **API ID**: `hero`
 * - **Description**: `Hero`
 * - **Documentation**: https://prismic.io/docs/core-concepts/reusing-slices
 *
 */
export type HeroSlice = prismicT.SharedSlice<"hero", HeroSliceVariation>;
declare module "@prismicio/client" {
    interface CreateClient {
        (repositoryNameOrEndpoint: string, options?: prismic.ClientConfig): prismic.Client<AllDocumentTypes>;
    }
    namespace Content {
        export type { LandingPageDocumentData, LandingPageDocumentDataSlicesSlice, LandingPageDocument, AllDocumentTypes, HeroSliceDefaultPrimary, HeroSliceDefault, HeroSliceVariation, HeroSlice };
    }
}
