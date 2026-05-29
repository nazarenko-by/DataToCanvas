eval "$(pyenv init -)"

parse_git_status() {
  if ! git rev-parse --is-inside-work-tree &>/dev/null; then
    return
  fi

  local branch=$(git branch --show-current 2>/dev/null)
  if [[ -z "$branch" ]]; then
    branch=$(git rev-parse --short HEAD 2>/dev/null) # якщо detached HEAD
  fi

  local status_output=$(git status --porcelain 2>/dev/null)

  local staged=$(echo "$status_output" | grep -c '^[AMDRC]')

  # Рахуємо файли, які не додані (unstaged змінені + untracked нові)
  local unstaged=$(echo "$status_output" | grep -c '^.[MD]')
  local untracked=$(echo "$status_output" | grep -c '^\??')
  local total_not_staged=$((unstaged + untracked))

  local git_info="%F{141} ($branch)%f"

  if [[ $staged -gt 0 || $total_not_staged -gt 0 ]]; then
    git_info+=":"

    if [[ $staged -gt 0 ]]; then
      git_info+="%F{076}+$staged%f"
    fi
    
    if [[ $total_not_staged -gt 0 ]]; then
      git_info+="%F{166}-$total_not_staged%f"
    fi
  fi

  echo -n "$git_info"
}

setopt PROMPT_SUBST
PROMPT='%F{123}%K{000}%m%F{015}%K{000}:%F{039}%K{000}%~$(parse_git_status)%{%F{none}%} $ '

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
