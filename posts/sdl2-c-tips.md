---
title: SDL2 / C Tips
date: '2023-07-15T12:08:09.908Z'
description: "FUCKK"
modified: '2023-07-15T12:08:20.073Z'
---

This answer is about MinGW / GCC, and not Visual Studio.

This answer only applies to Windows.

Common errors
The common errors are:

SDL.h: No such file or directory (when compiling)
Various SDL_main problems: "undefined reference to SDL_main", "conflicting types for SDL_main" or "number of arguments doesn't match prototype", etc. (when compiling or linking)
undefined reference to other functions (when linking)
DLL problems: (when running your program)
'??.dll' was not found
procedure entry point ... could not be located in ..., and other mysterious DLL-related errors
The program seemingly doing nothing when launched
This list is sorted from bad to good. If you change something and get a different error, use this list to tell if you made things better or worse.

The preamble
0. Don't follow bad advice.

Some resources will suggest you to do #define SDL_MAIN_HANDLED or #undef main. Don't blindly follow that advice, it's not how SDL2 is intended to be used.

If you do everything correcty, it will never be necessary. Learn the intended approach first. Then you can research what exactly that does, and make an educated decision.

1. Figure out how to compile directly from the console, you can start using an IDE and/or build system later. If you're using an IDE, I suggest to first make sure you're able to compile your program directly from the console, to rule out any IDE configuration problems. After you figure that out, you can use the same compiler options in your IDE.

The same applies to build systems, such as CMake.

2. Download the right SDL2 files. Make sure you have the right files. You need the archive called SDL2-devel-2.0.x-mingw.tar.gz from here.

Extract it to any directory, preferably somewhere near your source code. Extracting into the compiler installation directory is often considered a bad practice (and so is copying them to C:\Windows, which is a horrible idea).

3. Know the difference between compiler flags and linker flags. A "flag" is an option you specify in the command line when building your program. When you use a single command, e.g. g++ foo.cpp -o foo.exe, all your flags are added to the same place (to this single command).

But when you build your program in two steps, e.g.:

g++ foo.cpp -c -o foo.o (compiling)
g++ foo.o -o foo.exe (linking)
you have to know which of the two commands to add a flag to. Those are "compiler flags" and "linker flags" respectively.

Most IDEs will require you to specify compiler and linker flags separately, so even if you use a single command now, it's good to know which flag goes where.

Unless specified otherwise, the order of the flags doesn't matter.

SDL.h: No such file or directory
Or any similar error related to including SDL.h or SDL2/SDL.h.

You need to tell your compiler where to look for SDL.h. It's in the SDL files you've downloaded (see preamble).

Add -Ipath to your compiler flags, where path is the directory where SDL.h is located.

Example: -IC:/Users/HolyBlackCat/Downloads/SDL2-2.0.12/x86_64-w64-mingw32/include/SDL2. Relative paths work too, e.g. -ISDL2-2.0.12/x86_64-w64-mingw32/include/SDL2.

Note that the path will be different depending on how you write the #include:

If you do #include <SDL.h>, then the path should end with .../include/SDL2 (like above). This is the recommended way.
If you do #include <SDL2/SDL.h>, then the path should end with .../include.
Note: SDL2_image (and probably other SDL addons) uses #include "SDL.h" in its headers. So you must either use the former option, or copy SDL2_image's include directory on top of SDL2's include directory to have SDL_image.h in the same directory as SDL.h.

Various SDL_main problems
You can get several different errors mentioning SDL_main, such as undefined reference to SDL_main, or conflicting types for 'SDL_main', or number of arguments doesn't match prototype, etc.

You need to have a main function. Your main function must look like int main(int, char **). NOT int main() and NOT void main(). This is a quirk of SDL2, related to it doing #define main SDL_main.

Adding parameter names is allowed (and is mandatory in C), e.g. int main(int argc, char **argv). Also the second parameter can be written as char *[] or with a name: char *argv[]. No other changes are allowed.

If your project has multiple source files, make sure to include SDL.h in the file that defines the main function, even if it doesn't otherwise use SDL directly.

Try to avoid #define SDL_MAIN_HANDLED or #undef main when solving this issue, see preamble for explanation.

undefined reference to various functions
• undefined reference to SDL_...
The error message will mention various SDL_... functions, and/or WinMain. If it mentions SDL_main, consult the section "Various SDL_main problems" above. If the function names don't start with SDL_, consult the section "undefined reference to other functions" below.

You need to add following linker flags: -lmingw32 -lSDL2main -lSDL2 -Lpath, where path is the directory where libSDL2.dll.a and libSDL2main.a (which you've downloaded) are located. The order of the -l... flags matters. They must appear AFTER any .c/.cpp/.o files.

Example: -LC:/Users/HolyBlackCat/Desktop/SDL2-2.0.12/x86_64-w64-mingw32/lib. Relative paths work too, e.g. -LSDL2-2.0.12/x86_64-w64-mingw32/lib.

When you use -l???, the linker will look for a file called lib???.dll.a or lib???.a (and some other variants), which is why we need to pass the location of those files. libmingw32.a (corresponding to -lmingw32) is shipped with your compiler, so it already knows where to find it.

I added all those flags and nothing changed, or I'm getting skipping incompatible X when searching for Y:

You probably use the wrong SDL .a files. The archive you downloaded contains two sets of files: i686-w64-mingw32 (32-bit) and x86_64-w64-mingw32 (64-bit). You must use the files matching your compiler, which can also be either 32-bit or 64-bit.

Print (8*sizeof(void*)) to see if your compiler is 32-bit or 64-bit.

Even if you think you use the right files, try the other ones to be sure.

Some MinGW versions can be switched between 32-bit and 64-bit modes using -m32 and -m64 flags (add them to both compiler and linker flags).

I get undefined reference to a specific function:

• undefined reference to WinMain only
There are several possibilities, all of which were covered in the previous section:

You forgot -lmingw32 and/or -lSDL2main linker flags.
You must use following linker flags, in this exact order, after any .c/.cpp/.o files: -lmingw32 -lSDL2main -lSDL2
The libSDL2main.a file you use doesn't match your compiler (32-bit file with a 64-bit compiler, or vice versa).
Try to avoid #define SDL_MAIN_HANDLED or #undef main when solving this issue, see preamble for explanation.

• undefined reference to SDL_main only
See the section "Various SDL_main problems" above.

• undefined reference to other functions
Your linker found and used libSDL2.a, but it should be finding and using libSDL2.dll.a. When both are available, it prefers the latter by default, meaning you didn't copy the latter to the directory you passed to -L.

If you intended to perform static linking, see the section called "How do I distribute my app to others?" below.

Nothing happens when I try run my app
Let's say you try to run your app, and nothing happens. Even if you try to print something at the beginning of main(), it's not printed.

Windows has a nasty habit of not showing some DLL-related errors when the program is started from the console.

If you were running your app from the console (or from an IDE), instead try double-clicking the EXE in the explorer. Most probably you'll now see some DLL-related error; then consult one of the next sections.

??.dll was not found
Copy the .dll mentioned in the error message, and place it next to your .exe.

If the DLL is called SDL2.dll, then it's in the SDL files you've downloaded (see preamble). Be aware that there are two different SDL2.dlls: a 32-bit one (in the i686-w64-mingw32 directory), and a 64-bit one (in x86_64-w64-mingw32). Get the right one, if necessary try both.

Any other DLLs will be in your compiler's bin directory (the directory where gcc.exe is located).

You might need to repeat this process 3-4 times, this is normal.

For an automatic way of determining the needed DLLs, see the next section.

procedure entry point ... could not be located in ... and other cryptic DLL errors
Your program needs several .dlls to run, and it found a wrong version of one, left over from some other program you have installed.

It looks for DLLs in several different places, but the directory with the .exe has the most priority.

You should copy all DLLs your program uses (except the system ones) into the directory where your .exe is located.

A reliable way to get a list of needed DLLs is to blindly copy a bunch of DLLs, and then remove the ones that turn out to be unnecessary:

Copy SDL2.dll. It's in the SDL files you've downloaded (see preamble). Be aware that there are two different SDL2.dlls: a 32-bit one (in the i686-w64-mingw32 directory), and a 64-bit one (in x86_64-w64-mingw32). Get the right one, if necessary try both.

Copy all DLLs from your compiler's bin directory (the directory where gcc.exe is located).

Now your program should run, but we're not done yet.

Download NTLDD (or some other program that displays a list of used DLLs). Run ntldd -R your_program.exe.

Any DLL not mentioned in its output should be removed from the current directory. Your program uses everything that remains.

I ended up with following DLLs, expect something similar: SDL2.dll, libgcc_s_seh-1.dll, libstdc++-6.dll (C++ only), libwinpthread-1.dll.

Can I determine the needed DLLs without copying excessive ones?

Yes, but it's less reliable.

Your program searches for DLLs in following locations, in this order:

The directory where your .exe is located.
C:\Windows, including some of its subdirectories.
The directories listed in PATH.
Assuming you (or some jank installer) didn't put any custom DLLs into C:\Windows, adding your compiler's bin directory to the PATH (preferably as the first entry) and either putting SDL2.dll in the same directory as the .exe or into some directory in the PATH should be enough for your program to work.

If this works, you can then run ntldd without copying any DLLs beforehand, and copy only the necessary ones. The reason why you'd want to copy them at all at this point (since your app already works) is to be able to distribute it to others, without them having to install the compiler for its DLLs. Skip any DLLs located outside of your compiler's bin directory (except for SDL2.dll).

Note that the possibility of having weird DLLs in C:\Windows is real. E.g. Wine tends to put OpenAL32.dll into C:\Windows, so if you try this process with OpenAL on Wine, it will fail. If you're making a sciprt that runs ntldd automatically, prefer copying the DLLs (or at least symlinking them - I heard MSYS2 can emulate symlinks on Windows?).

Can I make an EXE that doesn't depend on any DLLs?

It's possible to make an .exe that doesn't depend on any (non-system) .dlls by using the -static linker flag, this is called "static linking". This is rarely done, and you shouldn't need to do this if you did the above steps correctly. This requires some additional linker flags; they are listed in file ??-w64-mingw32/lib/pkgconfig/sdl2.pc shipped with SDL, in the Libs.private section. Notice that there are two files, for x32 and x64 respectively.

How do I distribute my app to others?
Follow the steps in the previous section, titled procedure entry point ... could not be located in ....

A saner alternative?
There is MSYS2.

It has a package manager that lets you download prebuilt libraries, and, as a bonus, a fresh version of the compiler.

Install SDL2 from its package manager. Use a tool called pkg-config (also from the package manager) to automatically determine all necessary flags (pkg-config --cflags SDL2 for compiler flags, pkg-config --libs SDL2 for linker flags).

This is the same experience as you would have on Linux (maybe except for some DLL management hassle).

Bonus - Other problems
Q: My program always opens a console window when I run it, how do I hide it?

A: Add -mwindows to the linker flags.
Q: I get error 'SDL_VideoMode' wasn't declared in this scope.

A: SDL_VideoMode is from SDL1.2, it's not a part of the newer SDL2. Your code was written for the outdated version of SDL. Find a better tutorial that deals specifically with SDL2.
Q: My program has the default file icon, but I want a custom one.

A: Your icon must be in the .ico format. If your graphics editor doesn't support it, make a series of .pngs of common sizes (e.g. 16x16, 32x32, 48x48, 64x64), then convert them to a single .ico using ImageMagick: magick *.png result.ico (or with convert instead of magick).

Create a file with the .rc extension (say, icon.rc), with following contents MyIconName ICON "icon.ico" (where MyIconName is an arbitrary name, and "icon.ico" is the path to the icon). Convert the file to an .o using windres -O res -i icon.rc -o icon.o (the windres program is shipped with your compiler). Specify the resulting .o file when linking, e.g. g++ foo.cpp icon.o -o foo.exe.

Recent versions of SDL2 have a nice property of using the same icon as the window icon, so you don't have to use SDL_SetWindowIcon.


