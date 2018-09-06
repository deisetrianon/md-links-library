function getLinksFromMd(markdown) {
  if (!markdown) throw new Error('Empty parameter.');
  if (typeof markdown === 'number') throw new Error('The markdown is a number.');
  
  const regex_markdown = new RegExp(/(\[(\w)*\]).(https?:\/\/)?(www\.)?[a-z0-9]+(\.\w{2,}){1,2}(\/\w{1,})*(\/)*\)/g);
  const regex_text = new RegExp(/(\[(\w)*\])/g);
  const regex_url =  new RegExp(/(https?:\/\/)?(www\.)?[a-z0-9]+(\.\w{2,}){1,2}(\/\w{1,})*(\/)*/g);
  const array = [];

  const match_markdown = markdown.match(regex_markdown);
  if (match_markdown === null) return [];

  match_markdown.forEach(match_markdown => {
    const urlMatch = match_markdown.match(regex_url);
    const textMatch = match_markdown.match(regex_text);
    array.push(
      {
        href: urlMatch.toString(),
        text: textMatch.toString().slice(1,-1),
      }
    );
  });
  return array;
}

module.exports = getLinksFromMd;