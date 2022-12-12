clear
clc

rng(1,'twister');
H=[2^(-8);2^(-3)];% setting step-size
Alpha = [0.5;2] ; % order of derivative
Tol=[1e-6;1e-10]; % tolerance of iterations from computations
NC=[1;4]; % range of number of corrections

N=40; % number of random elements
RandVal=@(X)(X(2)-X(1)).*rand(N,1) + X(1); % Randomly choose value from the defined intervals
HR = RandVal(H);
NcR=randi(NC,N,1);
TolR=RandVal(Tol);
AlphaR=RandVal(Alpha);

%equation
F = @(t,y,al) 40320/gamma(9-al)*t.^(8-al) -3*gamma(5+al/2)/gamma(5-al/2)*t.^(4-al/2)+9/4*gamma(al+1) +(3/2*t.^(al/2)-t.^4).^3 - y.^(3/2) ;
% jacobian of the equation
JF = @(t,y,al) -3/2.*y.^(1/2) ;
%inputs

t0 = 0 ; T = 1 ; % initial and final time
y0 = 0 ; % initial value

% benchmarking
Bench1=zeros(N,4,2);
for i=1:N
    

    h=HR(i);
    nc=NcR(i);
    tol=TolR(i);
    alpha=AlphaR(i);
    param = alpha ; %parameter
    if  alpha>1
        y0 = [0,0];
        else
        y0=0;
    end
%computting the time
Bench1(i,1,1) = timeit(@() fde_pi1_ex(alpha,F,t0,T,y0,h,param));
Bench1(i,2,1) = timeit(@() fde_pi12_pc(alpha,F,t0,T,y0,h,param, nc));
Bench1(i,3,1) = timeit(@() fde_pi1_im(alpha,F,JF,t0,T,y0,h,param,tol));
Bench1(i,4,1) = timeit(@() fde_pi2_im(alpha,F,JF,t0,T,y0,h,param, tol));
%computting the error
[t1,y1]=fde_pi1_ex(alpha,F,t0,T,y0,h,param);
[t2,y2]=fde_pi12_pc(alpha,F,t0,T,y0,h,param, nc);
[t3,y3]=fde_pi1_im(alpha,F,JF,t0,T,y0,h,param,tol);
[t4,y4]=fde_pi2_im(alpha,F,JF,t0,T,y0,h,param, tol);

Exact=t1.^8 -3.*t1.^(4+alpha/2)+ 9/4*t1.^alpha;Ex=Exact(2:end);

Bench1(i,1,2)=norm(y1-Exact);
Bench1(i,2,2)=norm(y2-Exact);
Bench1(i,3,2)=norm(y3-Exact);
Bench1(i,4,2)=norm(y4-Exact);

end


% plotting
figure
s1=scatter(Bench1(:,:,1),Bench1(:,:,2),'*');
s1(1).MarkerEdgeColor='r';
s1(2).MarkerEdgeColor='g';
s1(3).MarkerEdgeColor='b';
s1(4).MarkerEdgeColor='k';
hold on
set(gca,'xscale','log','yscale','log')
xlabel("Execution time (Sc)")
ylabel("Square norm of errors")
legend("Explicit PI of rectanguar","Predictor-corrector PI rules","Implicit PI of rectanguar","Implicit PI trapezoidal rule")
%% save data
Ex1=table(HR,NcR,TolR,AlphaR,Bench1);
writetable(Ex1,'RndEx1.csv')
%% Stiff problem
% clear
% clc

rng(1,'twister');
H=[2^(-8);2^(-3)];% setting step-size
Alpha = [0.6;1] ; % order of derivative
Tol=[1e-6;1e-10]; % tolerance of iterations from computations
NC=[1;4]; % range of number of corrections
T1=[2;10]; % time
Lambda = [-1;-10]; % parameter

N=30; % number of random elements
RandVal=@(X)(X(2)-X(1)).*rand(N,1) + X(1); % Randomly choose value from the defined intervals
HR = RandVal(H);
NcR=randi(NC,N,1);
TolR=RandVal(Tol);
AlphaR=RandVal(Alpha);
LambdaR=RandVal(Lambda);
TR=RandVal(T1);

%Equation
F = @(t,y,lam) lam * y;
% jacobian of the equation
JF = @(t,y,lam) lam ;
%inputs
y0 = 1 ; t0=0;

%benchmarking
Bench2=zeros(N,4,2);

for i=1:N
   
    h=HR(i);
    T=TR(i);
    nc=NcR(i);
    tol=TolR(i);
    alpha=AlphaR(i);
    lambda=LambdaR(i);
    param = lambda ; %parameter

%computting the time
Bench2(i,1,1) = timeit(@() fde_pi1_ex(alpha,F,t0,T,y0,h,param));
Bench2(i,2,1) = timeit(@() fde_pi12_pc(alpha,F,t0,T,y0,h,param, nc));
Bench2(i,3,1) = timeit(@() fde_pi1_im(alpha,F,JF,t0,T,y0,h,param,tol));
Bench2(i,4,1) = timeit(@() fde_pi2_im(alpha,F,JF,t0,T,y0,h,param, tol));
%computting the error
[t1,y1]=fde_pi1_ex(alpha,F,t0,T,y0,h,param);
[t2,y2]=fde_pi12_pc(alpha,F,t0,T,y0,h,param, nc);
[t3,y3]=fde_pi1_im(alpha,F,JF,t0,T,y0,h,param,tol);
[t4,y4]=fde_pi2_im(alpha,F,JF,t0,T,y0,h,param, tol);


Ex=mlf(alpha,1,lambda*t1.^alpha);%exact solution
Bench2(i,1,2)=norm(y1-Ex);
Bench2(i,2,2)=norm(y2-Ex);
Bench2(i,3,2)=norm(y3-Ex);
Bench2(i,4,2)=norm(y4-Ex);
end
% plotting

% figure
s2=scatter(Bench2(:,:,1),Bench2(:,:,2),'*');
s2(1).MarkerEdgeColor='r';
s2(2).MarkerEdgeColor='g';
s2(3).MarkerEdgeColor='b';
s2(4).MarkerEdgeColor='k';
set(gca,'xscale','log','yscale','log')
xlabel("Execution time (Sc)")
ylabel("Square norm of errors")
legend("Explicit PI of rectanguar","Predictor-corrector PI rules","Implicit PI of rectanguar","Implicit PI trapezoidal rule")
%% save data
Ex2=table(HR,NcR,TolR,AlphaR,LambdaR,TR,Bench2);
writetable(Ex2,'RndEx2.csv')
%%
% clear
% clc

rng(1,'twister');
H=[2^(-8);2^(-3)];% setting step-size
Tol=[1e-6;1e-10]; % tolerance of iterations from computations
NC=[1;4]; % range of number of corrections
T1=[2;18]; % time


N=30; % number of random elements
RandVal=@(X)(X(2)-X(1)).*rand(N,1) + X(1); % Randomly choose value from the defined intervals
HR = RandVal(H);
NcR=randi(NC,N,1);
TolR=RandVal(Tol);
TR=RandVal(T1);

%Equation
F= @(t,y,param) -param(1)/param(2) *y;
%Jacobian of the equation
JF = @(t,y,param) -param(1)/param(2);
%inputs
k=16;m=4;
alpha = 2; param=[k,m];
t0 = 0 ; y0=[1,1];

% benchmarking
Bench3=zeros(N,4,2);
for i=1:N
    
    h=HR(i);
    nc=NcR(i);
    T=TR(i);
    tol=TolR(i);
    
%computting the time
Bench3(i,1,1) = timeit(@() fde_pi1_ex(alpha,F,t0,T,y0,h,param));
Bench3(i,2,1) = timeit(@() fde_pi12_pc(alpha,F,t0,T,y0,h,param, nc));
Bench3(i,3,1) = timeit(@() fde_pi1_im(alpha,F,JF,t0,T,y0,h,param,tol));
Bench3(i,4,1) = timeit(@() fde_pi2_im(alpha,F,JF,t0,T,y0,h,param, tol));
%computting the error
[t1,y1]=fde_pi1_ex(alpha,F,t0,T,y0,h,param);
[t2,y2]=fde_pi12_pc(alpha,F,t0,T,y0,h,param, nc);
[t3,y3]=fde_pi1_im(alpha,F,JF,t0,T,y0,h,param,tol);
[t4,y4]=fde_pi2_im(alpha,F,JF,t0,T,y0,h,param, tol);

%exact solution
Exact=y0(1).*cos(sqrt(k/m).*t1)+y0(2)./((sqrt(k/m))).*sin(sqrt(k/m).*t1);

Bench3(i,1,2)=norm(y1-Exact);
Bench3(i,2,2)=norm(y2-Exact);
Bench3(i,3,2)=norm(y3-Exact);
Bench3(i,4,2)=norm(y4-Exact);

end


% plotting

% figure
s3=scatter(Bench3(:,:,1),Bench3(:,:,2),'*');
s3(1).MarkerEdgeColor='r';
s3(2).MarkerEdgeColor='g';
s3(3).MarkerEdgeColor='b';
s3(4).MarkerEdgeColor='k';
set(gca,'xscale','log','yscale','log')
xlabel("Execution time (Sc)")
ylabel("Square norm of errors")
legend("Explicit PI of rectanguar","Predictor-corrector PI rules","Implicit PI of rectanguar","Implicit PI trapezoidal rule")
%% save data
Ex3=table(HR,NcR,TolR,TR,Bench3);
writetable(Ex3,'RndEx3.csv')
%%
% 
% clear
% clc

rng(1,'twister');
H=[2^(-2) 2^(-3) 2^(-4) 2^(-5) 2^(-6) 2^(-7)];% setting step-size
Tol=[1e-6;1e-8]; % tolerance of iterations from computations
NC=[1;4]; % range of number of corrections
T1=[40;80]; % time
I00=[0.01;0.1]; % initial value
Alp1=[0.7;1];
Alp2=[0.7;1];
Alp3=[0.7;1];
Beta=[0.01;0.4];

N=30; % number of random elements
RandVal=@(X)(X(2)-X(1)).*rand(N,1) + X(1); % Randomly choose value from the defined intervals
HR = randi([1,length(H)],N,1);
NcR=randi(NC,N,1);
TolR=RandVal(Tol);
alp1R=RandVal(Alp1);
alp2R=RandVal(Alp2);
alp3R=RandVal(Alp3);
II0=RandVal(I00);
TR=ceil(RandVal(T1));
BetaR=RandVal(Beta);
GamaR=(BetaR-Beta(1)).*rand(N,1) + Beta(1);

%equation
F=@funSIR;
%Jacobian of the equation
JF=@JfunSIR;

t0 = 0 ; 

% benchmarking
Bench4=zeros(N,4,2);
for i=1:N
    
    h=2^(-HR(i));
    nc=NcR(i);
    T=TR(i);
    tol=TolR(i);
    y0=[1-II0(i);II0(i);0];
    param1.b=BetaR(i); param1.g=GamaR(i);
    alpha=[alp1R(i),alp2R(i),alp3R(i)];

%solution with fine h
[tex,Exact]=fde_pi2_im(alpha,F,JF,t0,T,y0,2^(-10),param1, 1e-12);

%computting the time
Bench4(i,1,1) = timeit(@() fde_pi1_ex(alpha,F,t0,T,y0,h,param1));
Bench4(i,2,1) = timeit(@() fde_pi12_pc(alpha,F,t0,T,y0,h,param1, nc));
Bench4(i,3,1) = timeit(@() fde_pi1_im(alpha,F,JF,t0,T,y0,h,param1, tol));
Bench4(i,4,1) = timeit(@() fde_pi2_im(alpha,F,JF,t0,T,y0,h,param1, tol));
%computting the error
[t1,y1]=fde_pi1_ex(alpha,F,t0,T,y0,h,param1);
[t2,y2]=fde_pi12_pc(alpha,F,t0,T,y0,h,param1, nc);
[t3,y3]=fde_pi1_im(alpha,F,JF,t0,T,y0,h,param1,tol);
[t4,y4]=fde_pi2_im(alpha,F,JF,t0,T,y0,h,param1, tol);


Bench4(i,1,2)=norm(y1(:,1:end)-Exact(:,1:2^(10-HR(i)):end));
Bench4(i,2,2)=norm(y2(:,1:end)-Exact(:,1:2^(10-HR(i)):end));
Bench4(i,3,2)=norm(y3(:,1:end)-Exact(:,1:2^(10-HR(i)):end));
Bench4(i,4,2)=norm(y4(:,1:end)-Exact(:,1:2^(10-HR(i)):end));

end


% plotting

% figure
s3=scatter(Bench4(:,:,1),Bench4(:,:,2),'*');
s3(1).MarkerEdgeColor='r';
s3(2).MarkerEdgeColor='g';
s3(3).MarkerEdgeColor='b';
s3(4).MarkerEdgeColor='k';
set(gca,'xscale','log','yscale','log')
xlabel("Execution time (Sc)")
ylabel("Square norm of errors")
legend("Explicit PI of rectanguar","Predictor-corrector PI rules","Implicit PI of rectanguar","Implicit PI trapezoidal rule")
%%
Ex4=table(HR,NcR,TolR,alp1R,alp2R,alp3R,TR,II0,BetaR,GamaR,Bench4);
writetable(Ex4,'RndEx4.csv')