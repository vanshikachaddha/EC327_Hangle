# Variables
MAIN_PAGE = 1_mainpage.html
EASY_MODE = 3_easymode.html
MED_MODE = 3_medmode.html
HARD_MODE = 3_hardmode.html 
MULTIPLAYER = 3_multihangle.html
HANGMAN = 3_multihangman.html
BROWSER = open  
NODE = node
CHECK_LETTER = tests/checkletter.js
GET_RANDOM_WORD = tests/getRandomWord.js
GET_RANDOM_UNREVEALED_LETTER = tests/getRandomUnrevealedLetter.js
CHECK_GAME_OVER = tests/checkgameover.js

#Requires Node.js to run unit tests. 
#Please download Node https://nodejs.org/en/download/package-manager
test_mainpage:
	$(BROWSER) $(MAIN_PAGE)

test_easymode:
	$(BROWSER) $(EASY_MODE)

test_medmode:
	$(BROWSER) $(MED_MODE)

test_hardmode:
	$(BROWSER) $(HARD_MODE)

test_multiplayer:
	$(BROWSER) $(MULTIPLAYER)

test_hangman:
	$(BROWSER) $(HANGMAN)

test_checkletter:
	@echo "Running checkletter.js"
	$(NODE) $(CHECK_LETTER)

test_getrandomword:
	@echo "Running getRandomWord.js"
	$(NODE) $(GET_RANDOM_WORD)

test_get_random_unrevealed_letter:
	@echo "Running getRandomUnrevealedLetter.js"
	$(NODE) $(GET_RANDOM_UNREVEALED_LETTER)

test_check_game_over:
	@echo "Running checkgameover.js"
	$(NODE) $(CHECK_GAME_OVER)

help:
	@echo "Available targets:"
	@echo "make test_mainpage         					- Tests mainpage functionality"
	@echo "make test_easymode         					- Tests easy mode functionality"
	@echo "make test_medmode          					- Tests medium mode functionality"
	@echo "make test_hardmode         					- Tests hard mode functionality"
	@echo "make test_multiplayer      					- Tests multiplayer functionality"
	@echo "make test_hangman          					- Tests hangman functionality"
	@echo "make test_checkletter						- Tests checkletter function"
	@echo "make test_getrandomword						- Tests getRandomWord function"
	@echo "make test_get_random_unrevealed_letter				- Tests getRandomUnrevealedLetter function"
	@echo "make test_check_game_over					- Tests checkgameover function"

