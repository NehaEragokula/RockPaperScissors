import {Component} from 'react'

import Popup from 'reactjs-popup'

import {RiCloseLine} from 'react-icons/ri'

import {
  MainContainer,
  ScoreContentContainer,
  AppHeading,
  ScoreContainer,
  ScoreHeading,
  ButtonStyles,
  ImageStyles,
  YourChoiceMainContainer,
  RulesButton,
  RulesPopupContainer,
  PopupContentContainer,
  CloseButton,
  RulesImage,
  ResultParagraph,
  Container,
  ContentContainer,
  MainContentContainer,
} from './styledComponents'

const choicesList = [
  {
    id: 'ROCK',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rock-image.png',
  },
  {
    id: 'SCISSORS',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/scissor-image.png',
  },
  {
    id: 'PAPER',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/paper-image.png',
  },
]

class RockPaperScissors extends Component {
  state = {
    scoreCount: 0,
    showResult: false,
    gameResultText: '',
    userClickedImg: '',
    randomImg: '',
    you: '',
    opponent: '',
  }

  getGameTextResult = () => {
    const {you, opponent} = this.state

    if (you === 'ROCK') {
      if (opponent === 'SCISSORS') {
        this.setState(prevState => ({
          scoreCount: prevState.scoreCount + 1,
          gameResultText: 'YOU WON',
        }))
      } else if (opponent === 'ROCK') {
        this.setState({gameResultText: 'IT IS DRAW'})
      } else {
        this.setState(prevState => ({
          scoreCount: prevState.scoreCount - 1,
          gameResultText: 'YOU LOSE',
        }))
      }
    } else if (you === 'SCISSORS') {
      if (opponent === 'PAPER') {
        this.setState(prevState => ({
          scoreCount: prevState.scoreCount + 1,
          gameResultText: 'YOU WON',
        }))
      } else if (opponent === 'SCISSORS') {
        this.setState({gameResultText: 'IT IS DRAW'})
      } else {
        this.setState(prevState => ({
          scoreCount: prevState.scoreCount - 1,
          gameResultText: 'YOU LOSE',
        }))
      }
    } else if (you === 'PAPER') {
      if (opponent === 'ROCK') {
        this.setState(prevState => ({
          scoreCount: prevState.scoreCount + 1,
          gameResultText: 'YOU WON',
        }))
      } else if (opponent === 'PAPER') {
        this.setState({gameResultText: 'IT IS DRAW'})
      } else {
        this.setState(prevState => ({
          scoreCount: prevState.scoreCount - 1,
          gameResultText: 'YOU LOSE',
        }))
      }
    }
  }

  getRandomImage = () => {
    const listLength = choicesList.length
    const randomImgIndex = Math.floor(Math.random() * listLength)
    return choicesList[randomImgIndex]
  }

  onClickRock = () => {
    const getRandom = this.getRandomImage()
    this.setState(
      {
        userClickedImg: choicesList[0].imageUrl,
        showResult: true,
        randomImg: getRandom.imageUrl,
        you: choicesList[0].id,
        opponent: getRandom.id,
      },
      this.getGameTextResult,
    )
  }

  onClickScissor = () => {
    const getRandom = this.getRandomImage()
    this.setState(
      {
        userClickedImg: choicesList[1].imageUrl,
        showResult: true,
        randomImg: getRandom.imageUrl,
        you: choicesList[1].id,
        opponent: getRandom.id,
      },
      this.getGameTextResult,
    )
  }

  onClickPaper = () => {
    const getRandom = this.getRandomImage()
    this.setState(
      {
        userClickedImg: choicesList[2].imageUrl,
        showResult: true,
        randomImg: getRandom.imageUrl,
        you: choicesList[2].id,
        opponent: getRandom.id,
      },
      this.getGameTextResult,
    )
  }

  playAgainTheGame = () => {
    this.setState({showResult: false})
  }

  getRenderScoreView = () => {
    const {scoreCount} = this.state
    return (
      <ScoreContentContainer>
        <AppHeading>
          ROCK <br />
          PAPER <br />
          SCISSORS
        </AppHeading>
        <ScoreContainer>
          <ScoreHeading as="p">Score</ScoreHeading>
          <ScoreHeading as="p">{scoreCount}</ScoreHeading>
        </ScoreContainer>
      </ScoreContentContainer>
    )
  }

  getRenderUserChoiceImages = () => (
    <YourChoiceMainContainer>
      <div>
        <ButtonStyles
          type="button"
          onClick={this.onClickRock}
          data-testid="rockButton"
        >
          <ImageStyles src={choicesList[0].imageUrl} alt={choicesList[0].id} />
        </ButtonStyles>
        <ButtonStyles
          type="button"
          onClick={this.onClickScissor}
          data-testid="scissorsButton"
        >
          <ImageStyles src={choicesList[1].imageUrl} alt={choicesList[1].id} />
        </ButtonStyles>
      </div>
      <ButtonStyles
        type="button"
        onClick={this.onClickPaper}
        data-testid="paperButton"
      >
        <ImageStyles src={choicesList[2].imageUrl} alt={choicesList[2].id} />
      </ButtonStyles>
    </YourChoiceMainContainer>
  )

  getRenderRulesView = () => (
    <Popup modal trigger={<RulesButton type="button">RULES</RulesButton>}>
      {close => (
        <PopupContentContainer>
          <CloseButton type="button" onClick={() => close()}>
            <RiCloseLine size={40} />
          </CloseButton>
          <RulesImage
            src="https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rules-image.png"
            alt="rules"
          />
        </PopupContentContainer>
      )}
    </Popup>
  )

  getRenderResultView = () => {
    const {userClickedImg, gameResultText, randomImg} = this.state

    return (
      <MainContentContainer>
        <ContentContainer>
          <Container>
            <ResultParagraph>YOU</ResultParagraph>
            <ImageStyles src={userClickedImg} alt="your choice" />
          </Container>
          <Container>
            <ResultParagraph>OPPONENT</ResultParagraph>
            <ImageStyles src={randomImg} alt="opponent choice" />
          </Container>
        </ContentContainer>
        <ResultParagraph>{gameResultText}</ResultParagraph>
        <RulesButton type="type" onClick={this.playAgainTheGame}>
          PLAY AGAIN
        </RulesButton>
      </MainContentContainer>
    )
  }

  render() {
    const {showResult} = this.state
    return (
      <MainContainer>
        {this.getRenderScoreView()}
        {showResult
          ? this.getRenderResultView()
          : this.getRenderUserChoiceImages()}
        <RulesPopupContainer>{this.getRenderRulesView()}</RulesPopupContainer>
      </MainContainer>
    )
  }
}
export default RockPaperScissors
