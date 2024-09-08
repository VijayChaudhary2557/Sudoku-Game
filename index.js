let  container= document.querySelector('.container');
        
    let Sudoku = [];   // All Table Elements in 2D Array
    let Sudo = [];  // Sudoku Generated Question
    let SudokuAns = [];  // Sudoku Soluction
    let Table;   
    console.log(Sudoku);
      
    //--------------------------------------------Timer--------------------------------------------------------------
    let h = 0, m = 0, s = 0;
    let timerDisplay = document.querySelector('.result');
    let timerInterval;
    function startTimer(result) 
    {
        if(result=='Winner')
        {
            clearInterval(timerInterval);
            timerDisplay.textContent = "Winner";
        }
        else if (result=='Looser')
        {
            clearInterval(timerInterval);
            timerDisplay.textContent = "Wrong Solution";
        }
        else if (result=="Sudoku Soluction")
        {
            clearInterval(timerInterval);
            timerDisplay.textContent = "Sudoku Solution";
        }
        else
        {
            clearInterval(timerInterval);
            timerInterval = setInterval(function () 
            {
                s++;
                if (s >= 60) {
                    s = 0;
                    m++;
                }
                if (m >= 60) {
                    m = 0;
                    h++;
                }
                timerDisplay.textContent = h + ':' + m + ':' + s;
            }, 1000);
        }
    }
    document.querySelector('.Easy').addEventListener('click', function () 
    {
        h = 0;
        m = 0;
        s = 0;
        timerDisplay.textContent = '0:0:0';
        startTimer(); 
    });

    document.querySelector('.Medium').addEventListener('click', function () {
        h = 0;
        m = 0;
        s = 0;
        timerDisplay.textContent = '0:0:0'; 
        startTimer(); 
    });
    
    document.querySelector('.Hard').addEventListener('click', function () {
        h = 0;
        m = 0;
        s = 0;
        timerDisplay.textContent = '0:0:0'; 
        startTimer(); 
    });
        
    //--------------------------------------------Timer--------------------------------------------------------------
    
    function getGrid(level)
    {
        if(Sudoku.length!=0)
        {
            Table.remove();
        }
        Table = document.createElement('table');
        Table.setAttribute('class','myTable');
        Table.setAttribute('cellpadding', '0');
        Table.setAttribute('cellspacing','0');
        container.appendChild(Table);
        Sudoku = [];
        for(let i=0;i<9; i++)
        {
            let sub = [];
            for(let j=0; j<9; j++)
            {
                let ele = document.createElement('input');
                ele.setAttribute('type','number');
                ele.setAttribute('class','col');
                ele.setAttribute('oninput',"checkNum(this)");
                ele.setAttribute('onclick',"boxFillCss(this)")
                sub.push(ele);
            }
            Sudoku.push(sub);
        }
        console.log(Sudoku);
        for(let i=0; i<9; i++)
        {
            let row = Table.insertRow();
            row.setAttribute('name',i);
            Table.appendChild(row);
            for(let j=0; j<9; j++)
            {
                let cell = row.insertCell();
                cell.setAttribute('name',j);
                cell.appendChild(Sudoku[i][j]); 
                row.appendChild(cell);
            }
            Table.appendChild(row);
        }
        let n=9;
        let l = level
        let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        arr = shuffle(arr, n);
        console.log("Shuffle Arr:-- "+arr+"\n");
        Sudo = [
                        [0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0],
                    ];
        
        for (let i=0; i<n; i++)
        {
            Sudo[0][i]=arr[i];
        }
        SudokuSolver(Sudo, 0, 0, n, l);
    }

    function shuffle(arr, n)
    {
        for (let i = arr.length - 1; i > 0; i--) 
        {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }
    
    function SudokuSolver(Sudo, i, j, n, l)
    {
        // Base Case
        if(i==n)
        {
            EmptyElement(Sudo,n,l);
            return true;
        }
        // If we are not inside the Sudo
        if(j==n)
        {
            return SudokuSolver(Sudo, i+1, 0, n, l);
        }
        if(Sudo[i][j]!=0)
        {
            return SudokuSolver(Sudo,i,j+1,n, l);
        }
        // We try to fill the cell with appropriate number
        for(let num=1; num<=9; num++)
        {
            // Check is num can be filled
            if(isValid(Sudo, i, j, num, n))
            {
                Sudo[i][j]=num;
                if(SudokuSolver(Sudo, i, j+1, n, l))
                    return true;
                // Backtracking
                Sudo[i][j]=0;
            }
        }
        return false;
    }

    function isValid(Sudo, i, j, num, n)
    {
        // Row & Col Check
        for(let x=0; x<n; x++)
        {
            if(Sudo[i][x]==num || Sudo[x][j]==num)
            {
                return false;
            }
        }

        // Sub Matrix Check
        let rn = Math.sqrt(n);
        let si = i - i%rn;
        let sj = j - j%rn;

        for (let x=si; x<si+rn; x++)
        {
            for(let y=sj; y<sj+rn; y++)
            {
                if(Sudo[x][y]==num)
                {
                    return false;
                }
            }
        }
        return true;
    }


    function EmptyElement(Sudo, n, level) 
    {
        for(let i=0; i<9; i++)
        {
            SudokuAns[i]=[];
            for(let j=0; j<9; j++)
            {
                SudokuAns[i][j]=Sudo[i][j];
            }
        }

        console.log(SudokuAns);

        console.log(level);
        let cells_to_blank = level * (n * n); // 40% Elements of Sudo
        console.log(cells_to_blank);
        while (cells_to_blank > 0) 
        {
            let rand_row = Math.floor(Math.random()*(9-0)+0);
            let rand_col = Math.floor(Math.random()*(9-0)+0);

            if (Sudo[rand_row][rand_col] != 0) 
            {
                Sudo[rand_row][rand_col] = 0;
                cells_to_blank--;
            }
        }

        console.log(Sudo);
        Print(Sudo,n);
    }



    function Print(Sudo, n)
    {
        for(let i=0; i<n; i++)
        {
            for(let j=0; j<n; j++)
            {
                if(Sudo[i][j]==0)
                {
                    Sudoku[i][j].value="";
                }
                else
                {
                    Sudoku[i][j].value = Sudo[i][j];
                    Sudoku[i][j].style.color = '#00205b';
                    Sudoku[i][j].setAttribute('readonly',true);
                }
            }
        }
    }



    function checkNum(ele)
    {
        let a = parseInt(ele.value);
        if(a>9 || a<1)
        {
            ele.value=a%10;
        }

        let i = ele.parentElement.parentElement.getAttribute('name');
        let j = ele.parentElement.getAttribute('name');

        console.log(i);
        console.log(j);
        console.log("num:-"+a%10);

        if(isValid(Sudo, i, j, a%10, 9))
        {
            ele.classList.remove('error');
        }
        else
        {
            ele.classList.add('error');
        }
        Sudo[i][j]=a%10;

        console.log(Sudo);
        winnerCheck();
        // boxFillCss(i,j);
    }

    let checkingCss = 0;

    let Row;
    let Col;

    function boxFillCss(ele)
    {
        if(checkingCss!=0)
        {
            checkingCss=0;
            Sudoku[Row][Col].classList.remove('SelectedBox');
            for(let a=0; a<9; a++)
            {
                Sudoku[Row][a].classList.remove('boxFill');
                Sudoku[a][Col].classList.remove('boxFill');
            }

            let rn = Math.sqrt(9);
            let si = Row - Row%rn;
            let sj = Col - Col%rn;

            for (let x=si; x<si+rn; x++)
            {
                for(let y=sj; y<sj+rn; y++)
                {
                    Sudoku[x][y].classList.remove('boxFill');
                }
            }
        }
        let j = ele.parentElement.getAttribute('name');
        let i = ele.parentElement.parentElement.getAttribute('name');

        Row=i;
        Col=j;    
        console.log(i);
        console.log(j);
    
        // Sudoku[i][j].classList.add('SelectedBox');
    
        for(let a=0; a<9; a++)
        {
            Sudoku[i][a].classList.add('boxFill');
            Sudoku[a][j].classList.add('boxFill');

            let rn = Math.sqrt(9);
            let si = i - i%rn;
            let sj = j - j%rn;

            for (let x=si; x<si+rn; x++)
            {
                for(let y=sj; y<sj+rn; y++)
                {
                    Sudoku[x][y].classList.add('boxFill');
                }
            }
        }
        checkingCss++;
    }

    function getAns()
    {
        Print(SudokuAns, 9);
        startTimer("Sudoku Soluction");
    }

    function winnerCheck()
    {
        let check = 0;
        let ans = 0;

        for(let i=0;i<9;i++)
        {
            for(let j=0; j<9; j++)
            {
                if(Sudo[i][j]==0)
                {
                    check==0;
                    break;
                }
                else if (Sudo[i][j]==SudokuAns[i][j])
                {
                    ans++;
                    check++;
                }
                else
                {
                    check++;
                }
            }
        }
        console.log(ans);
        console.log(check);
        if(ans==81)
        {
            startTimer('Winner');
        }
        else if(check==81)
        {
            startTimer("Looser");
        }
    }
