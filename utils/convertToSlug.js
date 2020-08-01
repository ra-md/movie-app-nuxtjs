export default function convertToSlug(item) {
	if (item.id) {
		const titleOrName = item.title ? item.title : item.name;
		const onlyNumberAndString = titleOrName.match(/[\w\d\s-]/g).join('');
		const slug = onlyNumberAndString.replace(/\s/g, '-').replace(/-+/g, '-');
		return `${slug.toLowerCase()}-${item.id}`;
	}
}
