import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MessageModel} from '../sources/models/message.model';
import { timer } from 'rxjs/observable/timer';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {NodeModel} from '../sources/models/node.model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']

})
export class HomeComponent implements OnInit {

  nodes: NodeInterface[] = [{
    nodeId: '', mainTag: 'FC Barcelona',
    nodeTitle: 'The lead character, called \'The Bride,\' was a memb\'The Bearsal was gunned down by....',
    nodeImage: 'https://cdn.images.dailystar.co.uk/dynamic/58/photos/678000/620x/Barcelona-news-743557.jpg?r=5bf3e115c4f36'
  },
    {
      nodeId: '', mainTag: 'მადრიდის რეალი',
      nodeTitle: 'სანტიაგო სოლარიმ „რომასთან“ მატჩის წინ პრესკონფერენცია გამართა....',
      nodeImage: 'https://gdb.voanews.com/A7EF5C68-409F-4E94-9FB2-18EA106E45A5_w1023_r1_s.jpg'
    },
    {
      nodeId: '', mainTag: 'Manchester United',
      nodeTitle: 'The lead character, called \'The Bride,\' was a memb\'The Bearsal was gunned down by....',
      nodeImage: 'https://metrouk2.files.wordpress.com/2018/09/sei_25881790-5f45-e1536572956559.jpg?quality' +
                  '=90&strip=all&zoom=1&resize=644%2C443'
    },
    {
      nodeId: '', mainTag: 'FC Barcelona',
      nodeTitle: 'The lead character, called \'The Bride,\' was a memb\'The Bearsal was gunned down by....',
      nodeImage: 'https://e0.365dm.com/18/11/768x432/skysports-arthur-melo-arthur_4493328.jpg?20181120140154'
    },
    {
      nodeId: '', mainTag: 'Real Madrid',
      nodeTitle: 'The lead character, called \'The Bride,\' was a memb\'The Bearsal was gunned down by....',
      nodeImage: 'https://i.ytimg.com/vi/VJ5H2n5gaV0/maxresdefault.jpg'
    },
  ];


  messages: MessageModel[] = [
    {
      messageId : 'id1',
      messageAuthorId : 'authid1',
      authorImageUrl: 'https://i.ytimg.com/vi/DmIN5Vo-ST8/maxresdefault.jpg',
      authorName: 'Prof',
      messageType: 'text',
      messageBody: 'good one I like your comment',
      replyMessages: [],
      emojis: [{
        emojiId: '1',
        emojiUrl: '../../assets/emoji/1f595.png',
        emojiAuthorId: '1',
        emojiAuthorName: '1'
      },
        {
          emojiId: '2',
          emojiUrl: '../../assets/emoji/1f595.png',
          emojiAuthorId: '2',
          emojiAuthorName: '2'
        }],
      images: [],
      postedDate: 'dotay'
    },

    {
      messageId : 'id1',
      messageAuthorId : 'authid1',
      authorImageUrl: 'https://i.ytimg.com/vi/DmIN5Vo-ST8/maxresdefault.jpg',
      authorName: 'Prof',
      messageType: 'sticker',
      messageBody: 'teams/barcelona.png',
      replyMessages: [],
      emojis: [{
        emojiId: '1',
        emojiUrl: '../../assets/emoji/1f595.png',
        emojiAuthorId: '1',
        emojiAuthorName: '1'
      },
        {
          emojiId: '2',
          emojiUrl: '../../assets/emoji/1f595.png',
          emojiAuthorId: '2',
          emojiAuthorName: '2'
        }],
      images: [],
      postedDate: 'dotay'
    },

    {
      messageId : 'id2',
      messageAuthorId : 'authid2',
      authorImageUrl: 'https://i.ytimg.com/vi/DmIN5Vo-ST8/maxresdefault.jpg',
      authorName: 'Prof',
      messageType: 'text',
      messageBody: 'good go',
      replyMessages: [],
      emojis: [],
      images: [],
      postedDate: 'dotay'
    },

    {
      messageId : 'id3',
      messageAuthorId : 'authid3',
      authorImageUrl: 'https://i.ytimg.com/vi/DmIN5Vo-ST8/maxresdefault.jpg',
      authorName: 'Prof',
      messageType: 'text',
      messageBody: 'good go go go',
      replyMessages: [],
      emojis: [],
      images: [],
      postedDate: 'dotay'
    },

    {
      messageId : 'id4',
      messageAuthorId : 'authid4',
      authorImageUrl: 'https://i.ytimg.com/vi/DmIN5Vo-ST8/maxresdefault.jpg',
      authorName: 'Prof',
      messageType: 'text',
      messageBody: 'good one I like your commentgood one I like your commentgood one I like your commentgood one I like your comment' +
      'good one I like your commentgood one I like your commentgood one I like your commentgood one I like your comment',
      replyMessages: [],
      emojis: [],
      images: [],
      postedDate: 'dotay'
    },
    {
      messageId : 'id2',
      messageAuthorId : 'authid2',
      authorImageUrl: 'https://i.ytimg.com/vi/DmIN5Vo-ST8/maxresdefault.jpg',
      authorName: 'Prof',
      messageType: 'sticker',
      messageBody: 'teams/realmadrid.png',
      replyMessages: [],
      emojis: [{
        emojiId: '1',
        emojiUrl: '../../assets/emoji/1f595.png',
        emojiAuthorId: '1',
        emojiAuthorName: '1'
      }],
      images: [],
      postedDate: 'dotay'
    },

//
//     {
//       messageId : 'id2',
//       messageAuthorId : 'authid3',
//       authorImageUrl: 'https://i.ytimg.com/vi/DmIN5Vo-ST8/maxresdefault.jpg',
//       authorName: 'Prof',
//       messageType: 'images',
//       messageBody: 'teams/realmadrid.png',
//       replyMessages: [],
//       emojis: [{
//         emojiId: '1',
//         emojiUrl: '../../assets/emoji/1f595.png',
//         emojiAuthorId: '1',
//         emojiAuthorName: '1'
//       }],
//       images: [
//         {
//           imageId: 'imgid1',
//           imageUrl: 'https://wallpaperbrowse.com/media/images/soap-bubble-1958650_960_720.jpg'
//         },
//         {
//           imageId: 'imgid2',
//           imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlcfXb3a4jtMeBzpMA9QWAjPPC84XHaeC_Xg-qZ3lTFo75h-At '
//         },
//         {
//           imageId: 'imgid2',
//           imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlcfXb3a4jtMeBzpMA9QWAjPPC84XHaeC_Xg-qZ3lTFo75h-At '
//         },
//         {
//           imageId: 'imgid1',
//           imageUrl: 'https://wallpaperbrowse.com/media/images/soap-bubble-1958650_960_720.jpg'
//         },
//         {
//           imageId: 'imgid1',
//           imageUrl: 'https://wallpaperbrowse.com/media/images/soap-bubble-1958650_960_720.jpg'
//         },
//
//       ],
//       postedDate: 'dotay'
//     },
//
//     {
//       messageId : 'id2',
//       messageAuthorId : 'authid2',
//       authorImageUrl: 'https://i.ytimg.com/vi/DmIN5Vo-ST8/maxresdefault.jpg',
//       authorName: 'Prof',
//       messageType: 'images',
//       messageBody: 'teams/realmadrid.png',
//       replyMessages: [],
//       emojis: [{
//         emojiId: '1',
//         emojiUrl: '../../assets/emoji/1f595.png',
//         emojiAuthorId: '1',
//         emojiAuthorName: '1'
//       }],
//       images: [
//         {
//           imageId: 'imgid1',
//           imageUrl: 'https://wallpaperbrowse.com/media/images/soap-bubble-1958650_960_720.jpg'
//         },
//         {
//           imageId: 'imgid2',
//           imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlcfXb3a4jtMeBzpMA9QWAjPPC84XHaeC_Xg-qZ3lTFo75h-At '
//         },
//         {
//           imageId: 'imgid2',
//           imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlcfXb3a4jtMeBzpMA9QWAjPPC84XHaeC_Xg-qZ3lTFo75h-At '
//         },
//         {
//           imageId: 'imgid1',
//           imageUrl: 'https://wallpaperbrowse.com/media/images/soap-bubble-1958650_960_720.jpg'
//         },
//         {
//           imageId: 'imgid1',
//           imageUrl: 'https://wallpaperbrowse.com/media/images/soap-bubble-1958650_960_720.jpg'
//         },
//
//       ],
//     postedDate: 'dotay'
//     },
//
//
//
//
//
//     {
//       messageId : 'id2',
//       messageAuthorId : 'authid3',
//       authorImageUrl: 'https://i.ytimg.com/vi/DmIN5Vo-ST8/maxresdefault.jpg',
//       authorName: 'Prof',
//       messageType: 'video',
//       messageBody: 'https://www.youtube.com/embed/mZZsYDpS394',
//       replyMessages: [],
//       emojis: [{
//         emojiId: '1',
//         emojiUrl: '../../assets/emoji/1f595.png',
//         emojiAuthorId: '1',
//         emojiAuthorName: '1'
//       }],
//       images: [],
//       postedDate: 'dotay'
//     },
//
//
// {
//       messageId : 'id2',
//       messageAuthorId : 'authid3',
//       authorImageUrl: 'https://i.ytimg.com/vi/DmIN5Vo-ST8/maxresdefault.jpg',
//       authorName: 'Prof',
//       messageType: 'images',
//       messageBody: 'teams/realmadrid.png',
//       replyMessages: [],
//       emojis: [{
//         emojiId: '1',
//         emojiUrl: '../../assets/emoji/1f595.png',
//         emojiAuthorId: '1',
//         emojiAuthorName: '1'
//       }],
//       images: [
//         {
//           imageId: 'imgid1',
//           imageUrl: 'https://wallpaperbrowse.com/media/images/soap-bubble-1958650_960_720.jpg'
//         },
//
//       ],
//       postedDate: 'dotay'
//     },
//         {
//       messageId : 'id2',
//       messageAuthorId : 'authid2',
//       authorImageUrl: 'https://i.ytimg.com/vi/DmIN5Vo-ST8/maxresdefault.jpg',
//       authorName: 'Prof',
//       messageType: 'images',
//       messageBody: 'teams/realmadrid.png',
//       replyMessages: [],
//       emojis: [{
//         emojiId: '1',
//         emojiUrl: '../../assets/emoji/1f595.png',
//         emojiAuthorId: '1',
//         emojiAuthorName: '1'
//       }],
//       images: [
//         {
//           imageId: 'imgid1',
//           imageUrl: 'https://wallpaperbrowse.com/media/images/soap-bubble-1958650_960_720.jpg'
//         },
//         {
//           imageId: 'imgid2',
//           imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlcfXb3a4jtMeBzpMA9QWAjPPC84XHaeC_Xg-qZ3lTFo75h-At '
//         },
//
//       ],
//       postedDate: 'dotay'
//     },
//         {
//       messageId : 'id2',
//       messageAuthorId : 'authid4',
//       authorImageUrl: 'https://i.ytimg.com/vi/DmIN5Vo-ST8/maxresdefault.jpg',
//       authorName: 'Prof',
//       messageType: 'images',
//       messageBody: 'teams/realmadrid.png',
//       replyMessages: [],
//       emojis: [{
//         emojiId: '1',
//         emojiUrl: '../../assets/emoji/1f595.png',
//         emojiAuthorId: '1',
//         emojiAuthorName: '1'
//       }],
//       images: [
//         {
//           imageId: 'imgid1',
//           imageUrl: 'https://wallpaperbrowse.com/media/images/soap-bubble-1958650_960_720.jpg'
//         },
//         {
//           imageId: 'imgid2',
//           imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlcfXb3a4jtMeBzpMA9QWAjPPC84XHaeC_Xg-qZ3lTFo75h-At '
//         },
//         {
//           imageId: 'imgid2',
//           imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlcfXb3a4jtMeBzpMA9QWAjPPC84XHaeC_Xg-qZ3lTFo75h-At '
//         }
//
//       ],
//       postedDate: 'dotay'
//     },
//         {
//       messageId : 'id2',
//       messageAuthorId : 'authid1',
//       authorImageUrl: 'https://i.ytimg.com/vi/DmIN5Vo-ST8/maxresdefault.jpg',
//       authorName: 'Prof',
//       messageType: 'images',
//       messageBody: 'teams/realmadrid.png',
//       replyMessages: [],
//       emojis: [{
//         emojiId: '1',
//         emojiUrl: '../../assets/emoji/1f595.png',
//         emojiAuthorId: '1',
//         emojiAuthorName: '1'
//       }],
//       images: [
//         {
//           imageId: 'imgid1',
//           imageUrl: 'https://wallpaperbrowse.com/media/images/soap-bubble-1958650_960_720.jpg'
//         },
//         {
//           imageId: 'imgid2',
//           imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlcfXb3a4jtMeBzpMA9QWAjPPC84XHaeC_Xg-qZ3lTFo75h-At '
//         },
//         {
//           imageId: 'imgid2',
//           imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlcfXb3a4jtMeBzpMA9QWAjPPC84XHaeC_Xg-qZ3lTFo75h-At '
//         },
//         {
//           imageId: 'imgid1',
//           imageUrl: 'https://wallpaperbrowse.com/media/images/soap-bubble-1958650_960_720.jpg'
//         }
//
//       ],
//       postedDate: 'dotay'
//     },
  ];





  nodeOpenedFull: NodeModel = {
    nodeId: '',
    nodeAuthorId: '',
    authorName: 'Georgio Kelezoni',
    nodeTitle: 'The lead character, called \'The Bride,\' was a memb\'The Bearsal was gunned down by....',
    nodeTags: ['barcelona', 'Real Madrid'],
    nodeBody: '<p class="ql-align-justify"><span class="ql-font-monospace">Barcía Pimienta’s side came away with a well-earned point from the José Rico Pérez, in what was their the last game of 2018. Both teams had chances to win, Roigé going close for the hosts early on, and Wagué unlucky not to put Barça ahead inside the first twenty minutes of the game. Hércules enjoyed more possession but were unable to take advantage of their dominance.</span></p><p class="ql-align-justify"><span class="ql-font-monospace">Barcía Pimienta’s side came away with a well-earned point from the José Rico Pérez, in what was their the last game of 2018. Both teams had chances to win, Roigé going close for the hosts early on, and Wagué unlucky not to put Barça ahead inside the first twenty minutes of the game. Hércules enjoyed more possession but were unable to take advantage of their dominance.</span></p><p class="ql-align-justify"><span class="ql-font-monospace">Barcía Pimienta’s side came away with a well-earned point from the José Rico Pérez, in what was their the last game of 2018. Both teams had chances to win, Roigé going close for the hosts early on, and Wagué unlucky not to put Barça ahead inside the first twenty minutes of the game. Hércules enjoyed more possession but were unable to take advantage of their dominance.</span></p><p class="ql-align-justify"><span class="ql-font-monospace">Barcía Pimienta’s side came away with a well-earned point from the José Rico Pérez, in what was their the last game of 2018. Both teams had chances to win, Roigé going close for the hosts early on, and Wagué unlucky not to put Barça ahead inside the first twenty minutes of the game. Hércules enjoyed more possession but were unable to take advantage of their dominance.</span></p><p class="ql-align-justify"><span class="ql-font-monospace">Barcía Pimienta’s side came away with a well-earned point from the José Rico Pérez, in what was their the last game of 2018. Both teams had chances to win, Roigé going close for the hosts early on, and Wagué unlucky not to put Barça ahead inside the first twenty minutes of the game. Hércules enjoyed more possession but were unable to take advantage of their dominance.</span></p><p class="ql-align-justify"><span class="ql-font-monospace">Barcía Pimienta’s side came away with a well-earned point from the José Rico Pérez, in what was their the last game of 2018. Both teams had chances to win, Roigé going close for the hosts early on, and Wagué unlucky not to put Barça ahead inside the first twenty minutes of the game. Hércules enjoyed more possession but were unable to take advantage of their dominance.</span></p><p class="ql-align-justify"><span class="ql-font-monospace">Barcía Pimienta’s side came away with a well-earned point from the José Rico Pérez, in what was their the last game of 2018. Both teams had chances to win, Roigé going close for the hosts early on, and Wagué unlucky not to put Barça ahead inside the first twenty minutes of the game. Hércules enjoyed more possession but were unable to take advantage of their dominance.</span></p><p><br></p><p><br></p><h2 class="ql-indent-1"><strong style="color: red;" class="ql-font-monospace">Onslaught</strong></h2><p><span class="ql-font-monospace">As the minutes went by the Blaugranes found their rhythm of play, and Riqui Puig stung Falcon’s fingertips before Ballou had the best chance of the first half. Defensively superb, and with a notable performance from keeper Iñaki Peña, Barça didn’t surrender against a second half onslaught. The draw, against the team in third place, meant that the blaugranes ended the year with seven points from their final three games.</span></p><iframe class="ql-video ql-align-center" frameborder="0" allowfullscreen="true" src="https://www.youtube.com/embed/KzARx0EuDgc?showinfo=0"></iframe><p><br></p><h2><br></h2><h2 class="ql-indent-1"><strong style="color: rgb(0, 71, 178);" class="ql-font-monospace">MATCH DETAILS</strong></h2><p><span class="ql-font-monospace">Hércules CF, 0</span></p><p><span class="ql-font-monospace">FC Barcelona B, 0</span></p><p><br></p><p><strong class="ql-font-monospace">Hércules FC</strong><span class="ql-font-monospace">:&nbsp;Ismael Falcon, Juanjo Nieto, Nani, Pol Bueso, Samuel, Fran Miranda (Candela, min 68), Chechu (c) (Juli, min 79), Diego Benito, Pol Roigé, Carlos Martínez, José Fran (Emaná, min 56).</span></p><p><strong class="ql-font-monospace">FC Barcelona B</strong><span class="ql-font-monospace">:&nbsp;Iñaki Peña, Wague, Araujo, J. Cuenca, Guillem, O.Busquets (c), Carles Pérez, Riqui Puig (Jandro, min 90), Mujica (Marqués, min 71), Collado, Ballou (McGuane, min 78).</span></p><p><br></p>',
    sourceName: 'Baxtrionia.tylarw',
    sourceUrl: 'http://barcamania.ge/',
    createDate: '12-18-2018',
    lastChangeDate: '15-16-2017'
  };








  owner = 'authid2';
  // faCoffee = faCoffee;
  // faIgloo = faIgloo;
  // faYoutube = faYoutube;



  selectedIndex = 0;
  nodeOpened = false;

  openedNodeTemplate1 = '<p class="ql-align-justify"><span class="ql-font-monospace">Barcía Pimienta’s side came away with a well-earned point from the José Rico Pérez, in what was their the last game of 2018. Both teams had chances to win, Roigé going close for the hosts early on, and Wagué unlucky not to put Barça ahead inside the first twenty minutes of the game. Hércules enjoyed more possession but were unable to take advantage of their dominance.</span></p><p class="ql-align-justify"><span class="ql-font-monospace">Barcía Pimienta’s side came away with a well-earned point from the José Rico Pérez, in what was their the last game of 2018. Both teams had chances to win, Roigé going close for the hosts early on, and Wagué unlucky not to put Barça ahead inside the first twenty minutes of the game. Hércules enjoyed more possession but were unable to take advantage of their dominance.</span></p><p class="ql-align-justify"><span class="ql-font-monospace">Barcía Pimienta’s side came away with a well-earned point from the José Rico Pérez, in what was their the last game of 2018. Both teams had chances to win, Roigé going close for the hosts early on, and Wagué unlucky not to put Barça ahead inside the first twenty minutes of the game. Hércules enjoyed more possession but were unable to take advantage of their dominance.</span></p><p class="ql-align-justify"><span class="ql-font-monospace">Barcía Pimienta’s side came away with a well-earned point from the José Rico Pérez, in what was their the last game of 2018. Both teams had chances to win, Roigé going close for the hosts early on, and Wagué unlucky not to put Barça ahead inside the first twenty minutes of the game. Hércules enjoyed more possession but were unable to take advantage of their dominance.</span></p><p class="ql-align-justify"><span class="ql-font-monospace">Barcía Pimienta’s side came away with a well-earned point from the José Rico Pérez, in what was their the last game of 2018. Both teams had chances to win, Roigé going close for the hosts early on, and Wagué unlucky not to put Barça ahead inside the first twenty minutes of the game. Hércules enjoyed more possession but were unable to take advantage of their dominance.</span></p><p class="ql-align-justify"><span class="ql-font-monospace">Barcía Pimienta’s side came away with a well-earned point from the José Rico Pérez, in what was their the last game of 2018. Both teams had chances to win, Roigé going close for the hosts early on, and Wagué unlucky not to put Barça ahead inside the first twenty minutes of the game. Hércules enjoyed more possession but were unable to take advantage of their dominance.</span></p><p class="ql-align-justify"><span class="ql-font-monospace">Barcía Pimienta’s side came away with a well-earned point from the José Rico Pérez, in what was their the last game of 2018. Both teams had chances to win, Roigé going close for the hosts early on, and Wagué unlucky not to put Barça ahead inside the first twenty minutes of the game. Hércules enjoyed more possession but were unable to take advantage of their dominance.</span></p><p><br></p><p><br></p><h2 class="ql-indent-1"><strong style="color: red;" class="ql-font-monospace">Onslaught</strong></h2><p><span class="ql-font-monospace">As the minutes went by the Blaugranes found their rhythm of play, and Riqui Puig stung Falcon’s fingertips before Ballou had the best chance of the first half. Defensively superb, and with a notable performance from keeper Iñaki Peña, Barça didn’t surrender against a second half onslaught. The draw, against the team in third place, meant that the blaugranes ended the year with seven points from their final three games.</span></p><iframe class="ql-video ql-align-center" frameborder="0" allowfullscreen="true" src="https://www.youtube.com/embed/KzARx0EuDgc?showinfo=0"></iframe><p><br></p><h2><br></h2><h2 class="ql-indent-1"><strong style="color: rgb(0, 71, 178);" class="ql-font-monospace">MATCH DETAILS</strong></h2><p><span class="ql-font-monospace">Hércules CF, 0</span></p><p><span class="ql-font-monospace">FC Barcelona B, 0</span></p><p><br></p><p><strong class="ql-font-monospace">Hércules FC</strong><span class="ql-font-monospace">:&nbsp;Ismael Falcon, Juanjo Nieto, Nani, Pol Bueso, Samuel, Fran Miranda (Candela, min 68), Chechu (c) (Juli, min 79), Diego Benito, Pol Roigé, Carlos Martínez, José Fran (Emaná, min 56).</span></p><p><strong class="ql-font-monospace">FC Barcelona B</strong><span class="ql-font-monospace">:&nbsp;Iñaki Peña, Wague, Araujo, J. Cuenca, Guillem, O.Busquets (c), Carles Pérez, Riqui Puig (Jandro, min 90), Mujica (Marqués, min 71), Collado, Ballou (McGuane, min 78).</span></p><p><br></p>';
  openedNodeTemplate: SafeHtml;


  @ViewChild('scrollMe') private myScrollContainer: ElementRef;


  constructor(private sanitizer: DomSanitizer) {
    this.openedNodeTemplate = sanitizer.bypassSecurityTrustHtml(this.openedNodeTemplate1) ;
  }

  ngOnInit() {

    const source = timer(1000, 1000);
    // output: 0,1,2,3,4,5......
    const subscribe = source.subscribe(
      val => {
        // this.pushEmoji();
        // this.pushMessage();
      }
    );


  }


  pushEmoji() {
    this.messages[4].emojis.push(
      {
        emojiId: '1',
        emojiUrl: '../../assets/emoji/' + this.randomEmoji() + '.png',
        emojiAuthorId: '1',
        emojiAuthorName: '1'
      }
    );
    this.messages[1].emojis.push(
      {
        emojiId: '1',
        emojiUrl: '../../assets/emoji/' + this.randomEmoji() + '.png',
        emojiAuthorId: '1',
        emojiAuthorName: '1'
      }
    );
    this.messages[5].emojis.push(
      {
        emojiId: '1',
        emojiUrl: '../../assets/emoji/' + this.randomEmoji() + '.png',
        emojiAuthorId: '1',
        emojiAuthorName: '1'
      }
    );
    this.messages[11].emojis.push(
      {
        emojiId: '1',
        emojiUrl: '../../assets/emoji/' + this.randomEmoji() + '.png',
        emojiAuthorId: '1',
        emojiAuthorName: '1'
      }
    );
    this.messages[9].emojis.push(
      {
        emojiId: '1',
        emojiUrl: '../../assets/emoji/' + this.randomEmoji() + '.png',
        emojiAuthorId: '1',
        emojiAuthorName: '1'
      }
    );
  }


randomEmoji() {
  const emojitextArray = [
    '1f600',
    '1f616',
    '1f62b',
    '1f629',
    '1f92a',
    '1f913',
    '1f973',
    '1f92c',
    '1f4a9',
    '1f62c',
    '1f602',
    '1f915',
    '1f62f',
    '1f627',
    '1f634',
    '1f635',
    '1f923',
    '1f61b',
    '1f61a',
    '1f911',
    '1f618',
    '1f60d',
    '1f44d'
  ];
  const emojitextrandomNumber = Math.floor(Math.random() * emojitextArray.length);
  return emojitextArray[emojitextrandomNumber];
}

  pushMessage() {


    const textArray = [
      'authid2',
      'authid3'
    ];
    const textrandomNumber = Math.floor(Math.random() * textArray.length);

    const emojiNumber = Math.floor(Math.random() * 5);

    const messageArray = [
      'პერეს შენ გაარტყი რონალდოს დას',
      'xoo iseve rogorc raulis gutis ieros makeleles da ikeris samsaxurshi))))',
      'რაულს და გუტის ნუ ადარებთ ამ ნაბიჭვარს პერესი შესაძლოა მათთან დამნაშავეა მაგრამ არა რონალდოსთან არიცოდეთ მაინც ' +
      'რომ მას მხოლოდ საკუთარი ადარდებს',
      'pepe gamogrcha dzma pepe itxovda skamze davjdebi ogond damtoveto da moisroles cxvirsaxocivit nabo..zrebma.. ' +
      'ronaldos rac sheexeba did kontraqts aradzlevda 4-5wels peresi da mito wavida iuveshi romelmac xsenebuli' +
      ' kontraqti shestavaza. ronaldom rac gaaketa realistvis araa dasapasebeli? romel pexburtels aq meti gaketebuli?',
      'Milion procentiani simartle dawere zma + milioni',
      'კი',
      'პერეს ',
      'კრიშტიანუ რონალდუ რეალის ყველა დროის ყველაზე საუკეთესო მოთამაშეა გუნდის ისტორიაში და მას მხოლოდ ბარსელონას ' +
      'ფანები ახსენებენ აუგად.მან რეალის ისტორიის გადაწერაში და სამჯერ ჩემპიონთა ლიგის ზედიზედ მოგებაში ლომის წვლილი',
      ' შეიტანა.ხო და ვინც მას აუგად ახსენებს და ათას სისულელეს იძახის,ის \n' +
      'უბრალოდ ცოდოა.'
    ];
    const messagerandomNumber = Math.floor(Math.random() * messageArray.length);


    const forPush = {
      messageId : 'id2',
      messageAuthorId : textArray[textrandomNumber],
      authorImageUrl: 'https://i.ytimg.com/vi/DmIN5Vo-ST8/maxresdefault.jpg',
      authorName: 'Prof',
      messageType: 'text',
      messageBody: messageArray[messagerandomNumber],
      replyMessages: [],
      emojis: [

      ],
      images: [],
      postedDate: 'dotay'
    };

    for (let i = 0; i < emojiNumber; i++) {
      forPush.emojis.push(
        {
          emojiId: '1',
          emojiUrl: '../../assets/emoji/' + this.randomEmoji() + '.png',
          emojiAuthorId: '1',
          emojiAuthorName: '1'
        }
      );
    }

    this.messages.push(forPush);





  }

}

export interface NodeInterface {
  nodeId: string;
  mainTag: string;
  nodeTitle: string;
  nodeImage: string;
}
