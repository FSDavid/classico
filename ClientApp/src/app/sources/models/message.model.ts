export class MessageModel {
  messageId: string;
  messageAuthorId: string;
  authorImageUrl: string;
  authorName: string;
  messageType: string;
  messageBody: string;
  replyMessages: ReplyMessageModel[];
  emojis: Emoji[];
  images: Image[];
  postedDate: string;

  constructor(
      messageId: string,
      messageAuthorId: string,
      authorImageUrl: string,
      authorName: string,
      messageType: string,
      messageBody: string,
      replyMessages: ReplyMessageModel[],
      emojis: Emoji[],
      images: Image[],
      postedDate: string) {
      this.messageId = messageId;
      this.messageAuthorId = messageAuthorId;
      this.authorImageUrl = authorImageUrl;
      this.authorName = authorName;
      this.messageType = messageType;
      this.messageBody = messageBody;
      this.replyMessages = replyMessages;
      this.emojis = emojis;
      this.images = images;
      this.postedDate = postedDate;

  }

}

export class Emoji {
  emojiId: string;
  emojiUrl: string;
  emojiAuthorId: string;
  emojiAuthorName: string;
  constructor(
      emojiId: string,
      emojiUrl: string,
      emojiAuthorId: string,
      emojiAuthorName: string) {
    this.emojiId = emojiId;
    this.emojiUrl = emojiUrl;
    this.emojiAuthorId = emojiAuthorId;
    this.emojiAuthorName = emojiAuthorName;
  }
}
export class Image {
  imageId: string;
  imageUrl: string;
  constructor(
      imageId: string,
      imageUrl: string) {
    this.imageId = imageId;
    this.imageUrl = imageUrl;
  }
}



export class ReplyMessageModel {
  messageId: string;
  messageAuthorId: string;
  authorName: string;
  messageType: string;
  messageBody: string;
  emojis: Emoji[];
  postedDate: string;

  constructor(
    messageId: string,
    messageAuthorId: string,
    authorName: string,
    messageType: string,
    messageBody: string,
    emojis: Emoji[],
    postedDate: string) {
    this.messageId = messageId;
    this.messageAuthorId = messageAuthorId;
    this.authorName = authorName;
    this.messageType = messageType;
    this.messageBody = messageBody;
    this.emojis = emojis;
    this.postedDate = postedDate;

  }

}
