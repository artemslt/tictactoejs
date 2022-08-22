export default function markupList(data) {
  return data
    .map(
      ({ name, flags }) =>
        `<li><img src="${flags.svg}" alt="${name.official}" width="40" >${name.official}</li>`
    )
    .join('');
}
