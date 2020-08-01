export default function generateArrayOfObjects(length) {
	return new Array(length).fill().map(() => ({}));
}
