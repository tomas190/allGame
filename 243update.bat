@REM @ echo off
@ setlocal enabledelayedexpansion 
@ call set project=%~dp0
@ call set gitpath=D:\Burt\cocos_game\hotupdate\upgrade-server

@ call set mdate=%date%
@ call set mdate=%mdate: =%
@ call set mdate=%mdate:~10,4%
@ call set author=burt

call set pinpai=%1
call set huanjin=%2
call set hallversion=%3
@REM @ call set pinpai=test
@REM @ call set huanjin=dev
@REM @ call set hallversion="1.0.246"

@ call set commitm=%author%-%pinpai%-%huanjin%-"hotupdate"-%mdate%
@ call set h=%time:~0,2%
@ call set h=%h: =0%
@ call set t=%date:~0,10%-%h%:%time:~3,2%%time:~5,3%
@ call set com=%commitm%-%t%

@REM call set upGameList=-g hall -g bcbm -g bjl -g brnn -g ddz -g ebg -g hbld -g hbsl -g hh -g hwby -g jbpby -g lhd -g lp -g pdk -g pccp -g qznn -g sgj -g sss -g zjh -g zrsx -g 21d -g ermj -g dzpk -g shaibao -g sbty -g cyqp -g cbzb -g ygxb -g szwg

@REM @ call set argv=-h %huanjin% -p %pinpai% -hv %hallversion% %upGameList% 

@ call cd %gitpath%
@ call git pull

@REM @ call cd %project%
@REM @ call node 243update.js %argv%

@REM call C:/CocosDashboard_1.0.11/resources/.editors/Creator/2.4.3/CocosCreator.exe --path "D:/Burt/cocos_game/test_dev" --build --force

@ call cd %gitpath%
@ call git add .
@ call git commit -m %com%
@ call git push

@ call cd %gitpath%
@ call git log -1>>temp.txt
@ call set n=0
@ call set gitcode=""
@ call for /f "delims= tokens=* eol=" %%i in (temp.txt) do (
	set /a n=n+1
	if !n!==1 (
		set str=%%i
		set "str=!str:commit=!"
		set gitcode=!str!
		break
	)
)
@ call del temp.txt

@ call cd %project%
@ call node 243produceMail.js -c %gitcode% -h %huanjin% -p %pinpai%
@ call clip < versiontemp.txt

@REM @ call cd %project%
@REM @ if exist %project%.git (
@REM 	call git add .
@REM 	call git commit -m %com%
@REM 	call git push
@REM )

@REM pause

