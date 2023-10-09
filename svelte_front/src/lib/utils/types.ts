import type Image from '@lib/components/atoms/Image.svelte';
import * as fs from 'fs';
import type { SvelteComponent } from 'svelte';

export type Page = {
	name: string;
	id?: number;
	hidden: boolean;
	module: SvelteComponent;
	subpages: string[];
	routeParam: string;
};

export type NoUndefinedField<T> = { [P in keyof T]-?: Exclude<T[P], null | undefined> };

export type SparkleType = {
	id: string;
	createdAt: number;
	color: string;
	size: number;
	style: any;
};

export type TagType = {
	label: string;
	color?: 'primary' | 'secondary';
};

export type SocialLink = {};

//export type Project = {
//  name: string,
//  description: string,
//  //assetPath: string,
//  imagePath?: string,
//  link: string,
//  tags?: TagType[]
//}

export type BlogPost = {
	tags: string[];
	keywords: string[];
	hidden: boolean;
	slug: string;
	title: string;
	date: string;
	updated: string;
	excerpt: string;
	html: string | undefined;
	module: SvelteComponent;
	readingTime: string;
	relatedPosts: BlogPost[];
	coverImage: string | undefined;
};
