---
date: "2021-10-03"
diagram: false
image:
  placement: 3
  preview_only: true
math: false
tags:
- R
- NJ Politics
title: What social media data tells us about the New Jersey governor's race
---

Many people are talking about the 2021 governor's race in New Jersey online, especially after the first official debate this past week. In this post, I present an analysis of online chatter about the campaign created using the content of tweets posted by Governor Phil Murphy and his Republican challenger, Assemblyman Jack Ciattarelli and tweets posted about both of them in the last 30 days by Twitter users.

# Part 1: Twitter use by candidates
## Word choice highlights differing priorities, competing visions for NJ
I first queried the [Twitter API](https://developer.twitter.com/en/docs/twitter-api) to retrieve all posts made to both Governor Phil Murphy and Assemblyman Jack Ciattarelli's campaign twitter accounts in the last 30 days in order to analyze differences in content between the two candidates[^1] [^2].

[^1]: Governor Murphy's account contained tweets that were posted in Spanish during this time period. In order to ensure a consistent analysis, all of Governor Murphy's Spanish-language tweets were excluded from this analysis and only tweets written in English were retained.

[^2]: This analysis is limited only to the campaign / personal twitter accounts of the candidates ([@Jack4NJ](https://twitter.com/Jack4NJ) and [@PhilMurphyNJ](https://twitter.com/PhilMurphyNJ)) and no posts from official governmental accounts were used, as they likely would not have content about the campaign due to ethics rules prohibiting campaigning with governmental accounts.

Below, I present a word cloud which visualizes differences in the top words that appeared in each candidate's tweets during the past month. The larger a word appears in the word cloud, the more times it was used by the candidate in the last 30 days. In order to appear in the word cloud, the candidate must have used the word at least 10 times in tweets posted in the past month. The words that most frequently appeared on the Murphy campaign account were colored blue, while Ciattarelli's were colored red respectively.

{{< figure src="/media/govwordcloud21.png" title="Figure 1: Word cloud of Murphy vs Ciattarelli Tweets from 9/02/2021 - 10/2/2021" >}}

The word cloud illustrates some key differences in campaign rhetoric coming out of both camps. First, it's apparent that Ciattarelli uses his opponent's name in tweets far more often than Murphy, likely due to Ciattarelli's position as a challenger seeking to oust an incumbent. Murphy also invoked the name of his opponent in tweets, but he did so to a far lesser extent than Ciattarelli.

This visualization also reveals what each side is *not* talking about. This is contrast is clear on the topic of taxes. The word "taxes" appears as one of the largest terms in Ciattarelli's side of the word cloud, but does not appear at all on Murphy's side. The same can be said of the terms "gun safety," and "reproductive" (likely referring to legislation codifying abortion rights) which was one of the topics frequently mentioned by Murphy but not at all by Ciattarelli. Clearly, both candidates have different priorities in the issues they're emphasizing.

It was not surprising to see that "fairer", "stronger" and "forward" were also among the words most frequently used by Murphy. This was unsurprising as these are the motto of his reelection campaign and Murphy has consistently used these words to characterize his policy agenda.

## Twitter sentiment shows Ciattarelli has been more negative than Murphy
Another interesting difference between Murphy and Ciattarelli was whether the overall content of the tweets that they posted on a given day expressed a positive or negative sentiment. I conducted sentiment analysis on both candidates' tweets during the past month and visualized them as a line chart below.

{{< figure src="/media/sentiment_over_time_21.jpg" title="Figure 2: Average daily sentiment for Murphy and Ciattarelli Twitter Accounts" >}}

As I hypothesized, Governor Murphy's overall sentiment has been more positive than Jack Ciattarelli's throughout the campaign thus far. This is what one would expect to see from an incumbent politician. Murphy is an incumbent defending his record, whereas Ciattarelli is a challenger attempting to paint his opponent in a negative light, so it wasn't surprising to see that relative to Murphy, Ciattarelli's sentiment was overwhelmingly more negative.

In the days leading up to the debate, Murphy's overall sentiment sharply declined, likely coinciding with the launch of the governor's negative ad campaign targeting Ciattarelli. Going into the debate, Murphy was still more positive than Ciattarelli, but his overall sentiment sharply declined relative to its high point in previous weeks.

After the debate, both candidates became more positive in their sentiment, with Ciattarelli having a larger increase compared to Murphy. 

# Part 2: Conversations about the candidates
In this section, I analyzed tweets that were posted *about* the candidates, rather than only those posted by the candidates themselves. To do this I queried Twitter's 30-day API endpoint and requested the maximum amount of tweets available with 1 call to the API, which netted 3000 tweets about Phil Murphy and just over 2300 for Ciattarelli. These were combined together (with duplicates eliminated) to take the temperature of online conversations about the two candidates.

## Differences in hashtag use
Hashtags are an interesting item to study when looking at topics discussed on social media data, so I created two network diagrams covering tweets about both candidates. The network diagrams show the relationship between hashtags that were used together in Twitter posts. Each point in this diagram refers to a single hashtag. If hashtags were used together in the same tweet, a line was drawn between them. The thicker the line, the more often those two hashtags were used together.

{{< figure src="/media/njgovtweetnetwork.png" title="Figure 3: Network diagram of hashtags used together in tweets about Phil Murphy and Jack Ciattarelli" >}}

Tuesday night's debate was clearly a driver of chatter related to the race. The hashtag "#njgovdebate" was the most popular among tweets referencing either candidate in the last 30 days. 

Following the debate, Team Murphy doubled down on negative campaign rhetoric against Jack Ciattarelli by linking his statements made during the debate with the hashtag "#jackwilltakeusback," which was used most frequently with tweets that also referenced the debate hashtag. Several pro-Ciattarelli and NJGOP hashtags, such as "#letsfixnj" and "#jack4nj" were also used frequently within posts about the debate.

Two other clusters of hashtags were apparent from this network analysis as well. A range of issue-oriented hashtags, such as "#medicaid," "#healthcare," "#votingrights" and #jobs" appeared in a cluster used in conjunction with with the hashtags "#njpolitics," "#nj" and "#newjersey," suggesting particular concern with these issues among Twitter users.

## Who is driving the conversation about the candidates?
Lastly, we'll take a look at which Twitter users have been driving the conversation about the two candidates by analyzing how frequently they appeared in @ mentions within this snapshot of Twitter data.

Like the previous visualization, each link between usernames indicates that the accounts mentioned each other (including retweets), while the thickness signifies how often they were mentioned.

{{< figure src="/media/njgovtwitterusers.png" title="Figure 4: Network diagram of @ mentions in tweets about Phil Murphy and Jack Ciattarelli" >}}

The network visualization shows that the Twitter accounts of the candidates themselves were the most frequently mentioned. Within this snapshot in time,
Phil Murphy's campaign account, (@philmurphynj) was the most frequently mentioned, followed by Jack Ciattareill's (@jack4nj). The third most mentioned account was Murphy's official account (@govmurphy).

It was interesting to see that a number of influential political consultants, journalists & academic institutions were also frequently mentioned along with the candidates in tweets regarding the election.

## How this was done
All analysis was performed using R 4.1.1 and the [quanteda](https://joss.theoj.org/papers/10.21105/joss.00774) package.

