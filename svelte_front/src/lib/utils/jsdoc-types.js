export {};

/**
 * @typedef {{ [P in keyof T]-?: NoUndefinedField<NonNullable<T[P]>> }} NoUndefinedField
 * @template T
 */
/**
 * @typedef {{
 *   id: string,
 *   createdAt: number,
 *   color: string,
 *   size: number,
 *   style: any
 * }} SparkleType
 */
/**
 * @typedef {{
 *   label: string,
 *   color?: 'primary' | 'secondary'
 * }} TagType
 */
/**
 * @typedef {{
 * // TS-TO-JSDOC BLANK LINE //
 * }} SocialLink
 */
/**
 * @typedef {{
 *   name: string,
 *   description: string,
 *   image: string,
 *   link: string,
 *   tags: TagType[]
 * }} Feature
 */
/**
 * @typedef {{
 *   tags: string[],
 *   keywords: string[],
 *   hidden: boolean,
 *   slug: string,
 *   title: string,
 *   date: string,
 *   updated: string,
 *   excerpt: string,
 *   html: string | undefined,
 *   readingTime: string,
 *   relatedPosts: BlogPost[],
 *   coverImage: string | undefined
 * }} BlogPost
 */
