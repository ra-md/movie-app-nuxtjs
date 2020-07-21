function convertToSlug(title, id) {
	const onlyNumberAndString = title.match(/[\w\d\s-]/g).join('');
	const slug = onlyNumberAndString.replace(/\s/g, '-').replace(/-+/g, '-');
	return `${slug.toLowerCase()}-${id}`;
}

export default convertToSlug;
