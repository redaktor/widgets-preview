const findAndReplace = require('mdast-util-find-and-replace');
import hashtagRegex from '../framework/String/regex/regexHashTag';
const tagRegex = /#[a-z\d_]{2,40}\b/gi;

function replaceTag(value: string, match: any) {
  if (!value || !value.match(/[#＃]/) || !hashtagRegex.test(value) || /[:]/.test(value)) {
    return false
  }
  return {
    type: 'link',
    rel: 'tag',
    title: value,
    url: `/tags/${value.substr(1).toLowerCase()}`,
    children: [{type: 'text', value}]
  }
}

export default function hashtags() {
  return function transformer(tree: any) {
    findAndReplace(
      tree,
      [[tagRegex, replaceTag]],
      {ignore: ['link', 'linkReference']}
    )
  }
}
