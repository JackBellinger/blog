#[derive(Debug, Deserialize)]
pub struct Pagination {
	pub page: usize,
	pub limit: usize,
}

impl Default for Pagination {
	fn default() -> Self { Self { page: 1, limit: 10 } }
}

impl Pagination {
	pub fn to_limit_offset(&self) -> (usize, usize) { (self.limit, self.page.saturating_sub(1) * self.limit) }
}

fn pagination_headers(pagination: Pagination, count: usize, total_count: usize) -> HeaderMap {
	let mut headers = HeaderMap::with_capacity(5);
	headers.insert("Pagination-Count", count.into());
	headers.insert("Pagination-Total-Count", total_count.into());
	headers.insert("Pagination-Page", pagination.page.into());
	headers.insert("Pagination-Limit", pagination.limit.into());
	headers.insert(
		"Pagination-Total-Pages",
		((total_count as f32 / pagination.limit as f32).ceil() as usize).into(),
	);
	headers
}
