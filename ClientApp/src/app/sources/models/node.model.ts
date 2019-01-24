export class NodeModel {
  nodeId: string;
  nodeAuthorId: string;
  authorName: string;
  nodeTitle: string;
  nodeTags: string[];
  nodeBody: string;
  sourceName: string;
  sourceUrl: string;
  createDate: string;
  lastChangeDate: string;

  constructor(
    nodeId: string,
    nodeAuthorId: string,
    authorName: string,
    nodeBody: string,
    sourceName: string,
    sourceUrl: string,
    createDate: string,
    lastChangeDate: string,
    nodeTitle: string,
    nodeTags: string[]) {
    this.nodeId = nodeId;
    this.nodeAuthorId = nodeAuthorId;
    this.authorName = authorName;
    this.nodeBody = nodeBody;
    this.sourceName = sourceName;
    this.sourceUrl = sourceUrl;
    this.createDate = createDate;
    this.lastChangeDate = lastChangeDate;
    this.nodeTitle = nodeTitle;
    this.nodeTags = nodeTags;
  }

}
