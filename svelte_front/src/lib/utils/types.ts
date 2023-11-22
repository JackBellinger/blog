import type Image from '@lib/components/atoms/Image.svelte';
import * as fs from 'fs';
import type { SvelteComponent } from 'svelte';
import type { Invalidator, Subscriber, Unsubscriber, Writable } from 'svelte/store';

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

export type SyncReadable ={
	subscribe: (this: void, run: Subscriber<any>, invalidate?: Invalidator<any>) => Unsubscriber;
	init: any;
	set: (value: any) => void;
};

export type AsyncReadable = {
	subscribe: (this: void, run: Subscriber<any>, invalidate?: Invalidator<any>) => Unsubscriber;
	load: () => Promise<any>;
	reload: () => Promise<any>;
};

export type StoreFilter = Writable<{ searchTerm: string; selectedTags: Set<string> }>;

export type FilteredStore = {
	subscribe: (this: void, run: Subscriber<any>, invalidate?: Invalidator<any>) => Unsubscriber;
	load: () => Promise<any>;
};
export type FilterableAsyncStore = {
	items: AsyncReadable;
	filter: StoreFilter;
	filteredItems: FilteredStore;
};
