import type { IBlog, IComment } from '@/types'

// Bundled seed content (committed so it's available in production too).
export const seedBlogs: IBlog[] = [
   {
      "id": "HyRD2N-G",
      "title": "Why we went fully offline",
      "authorName": "Ashish",
      "tag": "Technology",
      "content": "<p>Most software today assumes a server somewhere, an account to log into, and a network connection that never blinks. LUMEN assumes none of that. Your posts live in plain files on your own machine, and the app reads and writes them directly.</p>\n<h2>What \"offline\" actually buys you</h2>\n<p>When there is no database to provision and no cloud to bill, a few good things happen at once. Setup is a single command. Your words never leave your disk. And the whole thing keeps working on a train, on a plane, or during the next outage.</p>\n<ul><li>No accounts, no passwords, no lock-in.</li><li>Data you can read with your own eyes — it's just JSON.</li><li>Back it up by copying a folder.</li></ul>\n<blockquote>The best place to keep your writing is somewhere you fully control.</blockquote>\n<p>It is not the right trade-off for every product. But for a personal writing space, owning the stack end to end feels less like a constraint and more like a relief.</p>",
      "createdAt": "2026-06-18T09:00:00.000Z",
      "updatedAt": "2026-06-18T09:00:00.000Z"
   },
   {
      "id": "eCpV-TvN",
      "title": "The case for black and white",
      "authorName": "Maya Quinn",
      "tag": "Others",
      "content": "<p>Color is a powerful tool, which is exactly why it is so easy to misuse. Strip an interface down to black and white and you are forced to solve the harder problems first: hierarchy, rhythm, and contrast.</p>\n<h2>Constraints sharpen the work</h2>\n<p>Without a palette to lean on, emphasis has to come from size, weight, and space. A single accent — here, one cool cyan — then lands with real intent instead of competing with five other hues.</p>\n<p>Monochrome also ages well. Trends in color come and go, but a confident black-and-white layout reads as deliberate ten years later. It is the typographic equivalent of a good tailored coat.</p>",
      "createdAt": "2026-06-17T09:00:00.000Z",
      "updatedAt": "2026-06-19T12:35:22.810Z"
   },
   {
      "id": "OleHevB-",
      "title": "Writing in the dark: a focus ritual",
      "authorName": "Ashish",
      "tag": "Health",
      "content": "<p>Deep work is less about willpower and more about removing the small frictions that pull you out of it. A dark, quiet editor is one of those removals.</p>\n<h2>A simple ritual</h2>\n<p>Close the extra tabs. Put the phone in another room. Open one document and write a single bad sentence on purpose — it breaks the spell of the blank page faster than anything else.</p>\n<ul><li>Protect a 45-minute block. Don't negotiate with it.</li><li>Write first, edit later. They use different muscles.</li><li>Stop while you still know the next sentence.</li></ul>\n<p>None of this is new advice. The trick is building a space that makes the good behavior the easy one.</p>",
      "createdAt": "2026-06-16T09:00:00.000Z",
      "updatedAt": "2026-06-19T10:21:28.729Z"
   },
   {
      "id": "pUdE5oEd",
      "title": "Glassmorphism, tastefully",
      "authorName": "Leo Marsh",
      "tag": "Technology",
      "content": "<p>Frosted glass panels look stunning in a mockup and terrible in production — unless you respect the one rule that makes the effect work: glass needs something behind it to refract.</p>\n<h2>Give the blur something to do</h2>\n<p>On a flat black page, a blurred panel is just a slightly lighter rectangle. Add a soft gradient or two of ambient light behind the content and suddenly the same panel reads as real glass.</p>\n<p>Keep the borders hairline, add a faint inner highlight along the top edge, and resist the urge to frost everything. Glass is an accent, not a background.</p>",
      "createdAt": "2026-06-15T09:00:00.000Z",
      "updatedAt": "2026-06-15T09:00:00.000Z"
   },
   {
      "id": "0Thpp9tY",
      "title": "Own your words: the small web returns",
      "authorName": "Nadia Sol",
      "tag": "Business",
      "content": "<p>For a decade we rented our audiences from platforms. The terms were generous until they weren't, and the reach we built was never really ours.</p>\n<h2>A quieter alternative</h2>\n<p>The small web is the slow return to spaces you own: a domain, a folder of posts, an audience that chose to be there. It scales worse and lasts longer.</p>\n<blockquote>If you don't own the front door, you don't own the house.</blockquote>\n<p>You give up the algorithmic lottery. In exchange you get something durable — a body of work that is entirely yours to move, archive, or rewrite.</p>",
      "createdAt": "2026-06-14T09:00:00.000Z",
      "updatedAt": "2026-06-14T09:00:00.000Z"
   },
   {
      "id": "fL-xksbz",
      "title": "Typography that earns its weight",
      "authorName": "Maya Quinn",
      "tag": "Others",
      "content": "<p>A grotesk at 900 weight is a statement. Used everywhere, it is just noise. Heavy type works because of what surrounds it, not in spite of it.</p>\n<h2>Pair big with quiet</h2>\n<p>Set the headline as loud as you dare, then let a calm monospace label and plenty of breathing room do the rest. The contrast between the two is where the design actually lives.</p>\n<p>Tighten the letter-spacing on display sizes, loosen it on small uppercase labels, and pick exactly one accent. Discipline, not decoration, is what makes type feel expensive.</p>",
      "createdAt": "2026-06-13T09:00:00.000Z",
      "updatedAt": "2026-06-13T09:00:00.000Z"
   },
   {
      "id": "rPG8MYtz",
      "title": "The quiet power of constraints",
      "content": "<p>Give a designer infinite options and you get mush. Give them three colors and a deadline and you get a poster worth keeping.</p><h2>Limits are a feature</h2><p>Constraints force decisions. They turn \"what could this be\" into \"what must this be,\" and that pressure is where taste actually shows up.</p><p>Pick your limits on purpose — a palette, a word count, a single typeface — and let them carry the work.</p>",
      "tag": "Others",
      "authorName": "Maya Quinn",
      "createdAt": "2026-06-12T09:00:00.000Z",
      "updatedAt": "2026-06-12T09:00:00.000Z"
   },
   {
      "id": "RKhhAq1_",
      "title": "Markdown is enough",
      "content": "<p>Every few years a new editor promises to revolutionize writing. Most of them add buttons. Markdown removed them, and that is why it survived.</p><h2>Plain text, long life</h2><p>It is readable raw, it diffs cleanly, and it will open in any editor in twenty years. Few formats can say the same.</p><ul><li>No lock-in.</li><li>Version-control friendly.</li><li>Keyboard-first, mouse-optional.</li></ul>",
      "tag": "Technology",
      "authorName": "Ashish",
      "createdAt": "2026-06-11T09:00:00.000Z",
      "updatedAt": "2026-06-11T09:00:00.000Z"
   },
   {
      "id": "WsxKz4fj",
      "title": "On finishing what you start",
      "content": "<p>Starting is cheap. The internet is a graveyard of bold first paragraphs. Finishing is the rare, unglamorous skill.</p><h2>Ship the draft</h2><p>A published \"good enough\" beats a perfect draft nobody reads. Set the bar at done, then raise it next time.</p><blockquote>Done is a decision, not a feeling.</blockquote>",
      "tag": "Health",
      "authorName": "Nadia Sol",
      "createdAt": "2026-06-10T09:00:00.000Z",
      "updatedAt": "2026-06-10T09:00:00.000Z"
   },
   {
      "id": "9SspdviR",
      "title": "The economics of attention",
      "content": "<p>When something is free, your attention is the price. Understanding that one sentence explains most of the modern web.</p><h2>Spend it deliberately</h2><p>Attention compounds like money: scattered, it earns nothing; concentrated, it builds things. Protect the deep hours the way you would protect savings.</p>",
      "tag": "Economy",
      "authorName": "Leo Marsh",
      "createdAt": "2026-06-09T09:00:00.000Z",
      "updatedAt": "2026-06-09T09:00:00.000Z"
   },
   {
      "id": "qlGbIR54",
      "title": "Build less, ship more",
      "content": "<p>The fastest way to finish a feature is to delete it. The second fastest is to never build it.</p><h2>Subtract first</h2><p>Most roadmaps are too long because saying no is harder than saying yes. A small product that works beats a large one that almost does.</p>",
      "tag": "Business",
      "authorName": "Ashish",
      "createdAt": "2026-06-08T09:00:00.000Z",
      "updatedAt": "2026-06-08T09:00:00.000Z"
   },
   {
      "id": "tCqSRxQU",
      "title": "A short defense of the long read",
      "content": "<p>Attention spans did not shrink. Patience for bad writing did. Give people something worth their time and they will give you the time.</p><h2>Earn the scroll</h2><p>Long is not the enemy; padding is. Cut the throat-clearing, keep the substance, and the length takes care of itself.</p>",
      "tag": "Others",
      "authorName": "Maya Quinn",
      "createdAt": "2026-06-07T09:00:00.000Z",
      "updatedAt": "2026-06-07T09:00:00.000Z"
   },
   {
      "id": "9tS057LB",
      "title": "Notes on naming things",
      "content": "<p>There are two hard problems in software, and naming is at least one and a half of them.</p><h2>Name for the reader</h2><p>A good name is a tiny piece of documentation that never goes stale. Spend the extra thirty seconds; your future self is the reader.</p>",
      "tag": "Technology",
      "authorName": "Leo Marsh",
      "createdAt": "2026-06-06T09:00:00.000Z",
      "updatedAt": "2026-06-06T09:00:00.000Z"
   }
]

export const seedComments: IComment[] = [
   {
      "id": "LAyndayU",
      "blogId": "HyRD2N-G",
      "name": "Priya",
      "text": "This is exactly the philosophy I wish more tools had. Copying a folder as a backup is so refreshing.",
      "createdAt": "2026-06-18T12:00:00.000Z",
      "updatedAt": "2026-06-18T12:00:00.000Z"
   },
   {
      "id": "vRa2NNCp",
      "blogId": "HyRD2N-G",
      "name": "Anonymous",
      "text": "Curious how this holds up with lots of posts, but for a personal blog it is perfect.",
      "createdAt": "2026-06-18T11:00:00.000Z",
      "updatedAt": "2026-06-18T11:00:00.000Z"
   },
   {
      "id": "fXt9lsKs",
      "blogId": "eCpV-TvN",
      "name": "Devon",
      "text": "The tailored coat line got me. Monochrome really does age better.",
      "createdAt": "2026-06-18T10:00:00.000Z",
      "updatedAt": "2026-06-18T10:00:00.000Z"
   }
]
