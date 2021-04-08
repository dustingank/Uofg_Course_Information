from course_parse import parse
from course_parse import course_obj

obj_list = parse(1)
count = 0

print("\n********************************************Test Case 1********************************************\n")
print("\t Check Human Resources and Orgnizational Behaviour (courses)\n")
for element in obj_list:
    if "HROB" in element.course_code:
        count += 1

if count == 15:
    print("Excepting: 15    Result: 15    PASS\n\n")
else:
    print("Excepting: 15    Result: " + str(count) + "    FAIL\n\n")

count = 0
print("********************************************Test Case 2********************************************\n")
print("\t Check Computing and Information Science (courses)\n")
for element in obj_list:
    if "CIS" in element.course_code:
        count += 1

if count == 48:
    print("Excepting: 48    Result: 48    PASS\n\n")
else:
    print("Excepting: 48    Result: " + str(count) + "    FAIL\n\n")

count = 0
print("********************************************Test Case 3********************************************\n")
print("\t Check Plant Biology (courses)\n")
for element in obj_list:
    if "PBIO" in element.course_code:
        count += 1

if count == 8:
    print("Excepting: 8    Result: 8    PASS\n\n")
else:
    print("Excepting: 8    Result: " + str(count) + "    FAIL\n\n")

count = 0
print("********************************************Test Case 4********************************************\n")
print("\t Check English (courses)\n")
for element in obj_list:
    if "ENGL" in element.course_code:
        count += 1

if count == 67:
    print("Excepting: 67    Result: 67    PASS\n\n")
else:
    print("Excepting: 67    Result: " + str(count) + "    FAIL\n\n")

print("********************************************Test Case 5********************************************\n")

for element in obj_list:
    if element.course_code == "VETM*3510" and element.credit_weight == "[0.25]":
        print("\tcheck VETM*3510 credit   Excepting:[0.25]     Result: [0.25]  PASS")
    elif element.course_code == "VETM*3510" and element.credit_weight != "[0.25]":
        print("\tcheck VETM*3510 credit   Excepting:[0.25]     Result: " + element.credit_weight + "  FAIL")

    if element.course_code == "NUTR*4510" and element.credit_weight == "[0.50]":
        print("\tcheck NUTR*4510 credit   Excepting:[0.50]     Result: [0.50]  PASS")
    elif element.course_code == "NUTR*4510" and element.credit_weight != "[0.50]":
        print("\tcheck NUTR*4510 credit   Excepting:[0.50]     Result: " + element.credit_weight + "  FAIL")

    if element.course_code == "MGMT*1000" and element.credit_weight == "[1.00]":
        print("\tcheck MGMT*1000 credit   Excepting:[1.00]     Result: [1.00]  PASS")
    elif element.course_code == "MGMT*1000" and element.credit_weight != "[1.00]":
        print("\tcheck MGMT*1000 credit   Excepting:[1.00]     Result: " + element.credit_weight + "  FAIL")

    if element.course_code == "VETM*3400" and element.credit_weight == "[0.75]":
        print("\tcheck VETM*3400 credit   Excepting:[0.75]     Result: [0.75]  PASS")
    elif element.course_code == "VETM*3400" and element.credit_weight != "[0.75]":
        print("\tcheck VETM*3400 credit   Excepting:[0.75]     Result: " + element.credit_weight + "  FAIL")

    if element.course_code == "ZOO*3630" and element.credit_weight == "[0.25]":
        print("\tcheck ZOO*3630  credit   Excepting:[0.25]     Result: [0.25]  PASS")
    elif element.course_code == "ZOO*3630" and element.credit_weight != "[0.25]":
        print("\tcheck ZOO*3630  credit   Excepting:[0.25]     Result: " + element.credit_weight + "  FAIL")

    if element.course_code == "HK*4240" and element.credit_weight == "[0.75]":
        print("\tcheck HK*4240   credit   Excepting:[0.75]     Result: [0.75]  PASS")
    elif element.course_code == "HK*4240" and element.credit_weight != "[0.75]":
        print("\tcheck HK*4240  credit    Excepting:[0.75]     Result: " + element.credit_weight + "  FAIL")

    if element.course_code == "ENGL*2880" and element.credit_weight == "[0.50]":
        print("\tcheck ENGL*2880 credit   Excepting:[0.50]     Result: [0.50]  PASS")
    elif element.course_code == "ENGL*2880" and element.credit_weight != "[0.50]":
        print("\tcheck ENGL*2880 credit   Excepting:[0.50]     Result: " + element.credit_weight + "  FAIL")

    if element.course_code == "CIS*1300" and element.credit_weight == "[0.50]":
        print("\tcheck CIS*1300  credit   Excepting:[0.50]     Result: [0.50]  PASS")
    elif element.course_code == "CIS*1300" and element.credit_weight != "[0.50]":
        print("\tcheck CIS*1300 credit   Excepting:[0.50]     Result: " + element.credit_weight + "  FAIL")

    if element.course_code == "CIS*2030" and element.credit_weight == "[0.50]":
        print("\tcheck CIS*2030  credit   Excepting:[0.50]     Result: [0.50]  PASS")
    elif element.course_code == "CIS*2030" and element.credit_weight != "[0.50]":
        print("\tcheck CIS*2030 credit   Excepting:[0.50]     Result: " + element.credit_weight + "  FAIL")

    if element.course_code == "HIST*4140" and element.credit_weight == "[1.00]":
        print("\tcheck HIST*4140 credit   Excepting:[1.00]     Result: [1.00]  PASS")
    elif element.course_code == "HIST*4140" and element.credit_weight != "[1.00]":
        print("\tcheck HIST*4140 credit   Excepting:[1.00]     Result: " + element.credit_weight + "  FAIL")

print("\n*********************************************  END  *********************************************\n")
        