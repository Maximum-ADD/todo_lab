# Project Retrospective

### This is a personal retrospective about my experience with the project - Adrian

This Project took 5 days to complete. Instead of researchinig how to use AI to code, I used LLMs the way I usually do for other tasks. I don't use LLMs that much (in comparison to some of my peers) so it was a little tough. I understand that I was inefficient and I know these systems are much more capable than what I did here, however, throughout the process I did not feel capable enough to use these systems to that full potential. I wanted to make sure I was present in each desicion Claude made because a lot of the things happening here are new to me. 

## Lets start with what I think went well:
1.  #### The project brief and rubric was a nessesary guide
    for this project and showed me the importance of contraints. without it the LLM would have been lost and so would I. It's important to note then that a project brief or rubric might be a nessesary document to build before using AI. Constraints, steps and specificity are prerequisites to any project with intergrity.
2. #### I broke the project down into steps first. 
    This was my first break through in dealing with an LLM. LLMs want to do everything all at once but I DO NOT. if we don't go step by step how will i understand what is even going on? Esspecially since I am not used to making projects on my own. (which must change if i want to use AI effectively)
3. #### Learning the basics of new technologies. 
    I haven't used NExt.js, SQLite or Vitest before. usinhg them here taught me the basics of what they are and their strengths and weaknesses. (although not entirely)
4. #### I figured an LLM would need context of previous conversations 
    whenever I switched accounts before it could work properly. So a context file would be created almost everytime i left a conversation.
5. #### frequent commits. 
    although sometimes bundling unrelated changes together or not being very descriptive, I commited frequently nd tried using a commit technique I learnt in class.
6. #### I was able to change some of the initial decisions
     that Claude made such as combining the DaysUntilDue logic into one function instead of 2

## Now what went bad:
1. #### instead of creating just the UI/scaffolding like I asked, 
    Claude made the whole project removing many oppurtunities for learning. 
2. #### Lack of clean code. 
    of enforcing naming conventions and function conventions I left claude to generate all the code on its own and left it like that. my bad. I need another doc documenting general preferences and another one documentinig project specific preferences.Noted for future
3. #### Misunderstanding code. 
    I'm lazy I guess. I only read over some files generated and just kind of went with whatever Claude made half the time so long as it worked. Even words in file names like "Modal" are new to me. Like TaskDbRow vs TaskRow which leads me onto point 4. 
4. #### Code redundancies: 
    TaskRow and TaskDbRow are the same thing just one is newer than the other. I am noticing this now on a Sunday before the week starts. there are probably many more cases like this which I missed. This brings me to:
5. #### Lack of protocal. 
    Throughout this project I have learnt that having a protocal for one's workflow is important to ensure quality and clarity. this retrospective makes that even clearer. Throughout my life protocal was inforced onto me and I fell in line. Rubrics, wake up times, room inspections, SCRUM methodology; I never had to think about what was important and what wasn't. It was all laid infront of me. That made me disorganised and the type of preson who reacts to things instead of preemting them and planning for them. making a project alone but as the sole authority teaches you the importance of protocal and now the tedious SCRUM methodology doesn't seem that bad. 
6. #### No UI design.
    I enjoyed designing the UX but I have no idea how to do UI. that was AI generated to the max. and I guess that is okay since UI/ UX was not in the given rubric.
7. #### AI documentation.
    I used AI to generate each and every document without a care in the world. I read over them and ensured they were readable but thats it. no effort was made otherwise and that feels a little scummy to me. documents help one think through what they are doing. My thought felt surface level.

## Lets develop a protocal for using LLMs to code based off of this experience:

We will split this into the overarchiing work and he granular work

### overall project (per version):

_Initialize_: 
    create a project brief and rubric, ( assumptions and constraints ) create/update a doc on your coding preferences, create a doc for the project prefrences and dependancy constraints, create a loose step by step plan for yourself about completing this version of the software. have a  flexable plan as to what docuentation you want to create

_Work_: 
    follow workflow protocal ensure the LLMs nor third party has to guess what is happening or what must be done. create documentation as you go along to help you and others realise how the software interacts. Images, explainations, graphs etc

_Review_: 
    Go through the project using the brief and rubric you made ensuring all constraints are met and assumptions hold. test the software for yourself ensuring it is up to standard when being used.

### workflow:

_Define_: 
    What feature/ bug/ issue must be dealt with. be specific, use software dev lingo and refrence where in the codebase you want something added/changed using what framework/ design/ model (and additionally if not in your preference docs how to do it aswell) 

_Generate_: 
    use what you defined in a prompt ensuring only what you defined gets implemented. ask for logs to use for future testing.

_Proofread_: 
    Whatever was generated proof read it ensuring you know what each element of it means and what it does

_Cross reference:_ 
    look at the new genration in context. what is it doing to code in a file? is it connected to other files? is there anything similar in the other files already?

_Question_: 
    Question the LLM on why it implemented it this way instead of another way. what tech has it used. why did it implement something when it already exists elsewhere. what didn't you like or what dont you understand?

_Edit_: 
    if any issues are found in your understanding or in the implementation edit them either yourself or with the LLM

_Test_: 
    create a test case for the implementation or run the program to see if it works how you expect. use dev tools and logging to your advantage

_Commit_: 
    commit the change/ changes using a commit convention. before you finish review/ summarize what happened and state which AI was used




