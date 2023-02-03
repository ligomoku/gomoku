import * as xhr from 'common/xhr';
export const skip = (txt) => (suspLink(txt) || followMe(txt)) && !isKnownSpammer();
export const selfReport = (txt) => {
    if (isKnownSpammer())
        return;
    const hasSuspLink = suspLink(txt);
    if (hasSuspLink)
        xhr.text(`/jslog/${window.location.href.substr(-12)}?n=spam`, { method: 'post' });
    if (hasSuspLink || followMe(txt))
        lichess.storage.set('chat-spam', '1');
};
const isKnownSpammer = () => lichess.storage.get('chat-spam') == '1';
const spamRegex = new RegExp([
    'xcamweb.com',
    '(^|[^i])chess-bot',
    'chess-cheat',
    'coolteenbitch',
    'letcafa.webcam',
    'tinyurl.com/',
    'wooga.info/',
    'bit.ly/',
    'wbt.link/',
    'eb.by/',
    '001.rs/',
    'shr.name/',
    'u.to/',
    '.3-a.net',
    '.ssl443.org',
    '.ns02.us',
    '.myftp.info',
    '.flinkup.com',
    '.serveusers.com',
    'badoogirls.com',
    'hide.su',
    'wyon.de',
    'sexdatingcz.club',
    'qps.ru',
    'tiny.cc/',
    'trasderk.blogspot.com',
]
    .map(url => url.replace(/\./g, '\\.').replace(/\//g, '\\/'))
    .join('|'));
const suspLink = (txt) => !!txt.match(spamRegex);
const followMeRegex = /follow me|join my team/i;
const followMe = (txt) => !!txt.match(followMeRegex);
const teamUrlRegex = /lichess\.org\/team\//i;
export const hasTeamUrl = (txt) => !!txt.match(teamUrlRegex);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BhbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9zcGFtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sS0FBSyxHQUFHLE1BQU0sWUFBWSxDQUFDO0FBRWxDLE1BQU0sQ0FBQyxNQUFNLElBQUksR0FBRyxDQUFDLEdBQVcsRUFBRSxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztBQUUzRixNQUFNLENBQUMsTUFBTSxVQUFVLEdBQUcsQ0FBQyxHQUFXLEVBQUUsRUFBRTtJQUN4QyxJQUFJLGNBQWMsRUFBRTtRQUFFLE9BQU87SUFDN0IsTUFBTSxXQUFXLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2xDLElBQUksV0FBVztRQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7SUFDbkcsSUFBSSxXQUFXLElBQUksUUFBUSxDQUFDLEdBQUcsQ0FBQztRQUFFLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxHQUFHLENBQUMsQ0FBQztBQUMxRSxDQUFDLENBQUM7QUFFRixNQUFNLGNBQWMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsSUFBSSxHQUFHLENBQUM7QUFFckUsTUFBTSxTQUFTLEdBQUcsSUFBSSxNQUFNLENBQzFCO0lBQ0UsYUFBYTtJQUNiLG1CQUFtQjtJQUNuQixhQUFhO0lBQ2IsZUFBZTtJQUNmLGdCQUFnQjtJQUNoQixjQUFjO0lBQ2QsYUFBYTtJQUNiLFNBQVM7SUFDVCxXQUFXO0lBQ1gsUUFBUTtJQUNSLFNBQVM7SUFDVCxXQUFXO0lBQ1gsT0FBTztJQUNQLFVBQVU7SUFDVixhQUFhO0lBQ2IsVUFBVTtJQUNWLGFBQWE7SUFDYixjQUFjO0lBQ2QsaUJBQWlCO0lBQ2pCLGdCQUFnQjtJQUNoQixTQUFTO0lBQ1QsU0FBUztJQUNULGtCQUFrQjtJQUNsQixRQUFRO0lBQ1IsVUFBVTtJQUNWLHVCQUF1QjtDQUN4QjtLQUNFLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7S0FDM0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUNiLENBQUM7QUFFRixNQUFNLFFBQVEsR0FBRyxDQUFDLEdBQVcsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7QUFFekQsTUFBTSxhQUFhLEdBQUcseUJBQXlCLENBQUM7QUFDaEQsTUFBTSxRQUFRLEdBQUcsQ0FBQyxHQUFXLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBRTdELE1BQU0sWUFBWSxHQUFHLHVCQUF1QixDQUFDO0FBQzdDLE1BQU0sQ0FBQyxNQUFNLFVBQVUsR0FBRyxDQUFDLEdBQVcsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUMifQ==