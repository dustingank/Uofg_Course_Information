from course_parse import parse
from course_parse import course_obj
import search
import unittest

class test_search_parse_user_input(unittest.TestCase):

  def test_case_course_title(self):
    expected = {'course_title': None, 'course_code': None, 'semesters_offered': None, 'lecture_hours': None, 'lab_hours': None, 'credit_weight': '[0.75]', 'description': None, 'departments': None, 'prerequisites': None, 'restrictions': None, 'co_requistes': None, 'section': 'cis', 'ranked_by': None}
    ret = search.parse_user_input("Show me all \"cis\" courses with 0.75 credits")
    self.assertEqual(expected, ret)

  def test_case_cis1500(self):
    expected = {'course_title': None, 'course_code': 'cis*1500', 'semesters_offered': ['F'], 'lecture_hours': None, 'lab_hours': None, 'credit_weight': None, 'description': None, 'departments': None, 'prerequisites': None, 'restrictions': None, 'co_requistes': None, 'section': None, 'ranked_by': None}
    ret = search.parse_user_input("Show me CIS*1500 with a fall offering")
    self.assertEqual(expected, ret)

  def test_case_winter(self):
    expected = {'course_title': None, 'course_code': None, 'semesters_offered': ['W'], 'lecture_hours': None, 'lab_hours': None, 'credit_weight': None, 'description': None, 'departments': None, 'prerequisites': None, 'restrictions': None, 'co_requistes': None, 'section': None, 'ranked_by': None}
    ret = search.parse_user_input("Winter offering")
    self.assertEqual(expected, ret)

  def test_case_lec_lab_desc(self):
    expected = {'course_title': None, 'course_code': None, 'semesters_offered': None, 'lecture_hours': "3", 'lab_hours': "2", 'credit_weight': None, 'description': "scottish", 'departments': None, 'prerequisites': None, 'restrictions': None, 'co_requistes': None, 'section': None, 'ranked_by': None}
    ret = search.parse_user_input("Show me all course with 3 lecture hours 2 lab hours about \"scottish\"")
    self.assertEqual(expected, ret)

class test_search_search(unittest.TestCase):
  
  def test_case_search_sem_credit(self):
    g = parse(0)
    expected = '{"course_title": "User Interface Design", "course_code": "CIS*2170", "semesters_offered": ["W"], "lecture_hours": "2", "lab_hours": "3", "credit_weight": "[0.75]", "description": " This course is a practical introduction to the area of user interface construction. Topics include user interface components and their application, best practices for user interface design, approaches to prototyping, and techniques for assessing interface suitability. "}'
    ret = search.search(search.parse_user_input("Show me all courses with \"cis\" courses with 0.75 credits"), g)
    self.assertTrue(ret is not None)
    self.assertEqual(len(ret), 4)
    for i in ret:
      self.assertTrue("CIS" in i.course_code)
    for i in ret:
      self.assertTrue("[0.75]" in i.credit_weight)

  def test_case_search_title_code(self):
    g = parse(0)
    ret = search.search(search.parse_user_input("Course title \"Parallel Programming\" with the code cis*3090"), g)
    self.assertTrue(ret is not None)
    self.assertEqual(len(ret), 1)
    for i in ret:
      self.assertTrue("Parallel Programming" in i.course_title)
    for i in ret:
      self.assertTrue("CIS*3090" in i.course_code)

  def test_case_sem_lec(self):
    g = parse(0)
    ret = search.search(search.parse_user_input("Show me a fall offering with 3 lecture hours"), g)
    self.assertTrue(ret is not None)
    self.assertEqual(len(ret), 80)
    for i in ret:
      self.assertTrue("F" in i.semesters_offered)
    for i in ret:
      self.assertTrue("3" in i.lecture_hours)

  def test_case_lab(self):
    g = parse(0)
    ret = search.search(search.parse_user_input("Show me all \"cis\" courses with 3 lab hours"), g)
    self.assertTrue(ret is not None)
    self.assertEqual(len(ret), 39)
    for i in ret:
      self.assertTrue("3" in i.lab_hours)
    for i in ret:
      self.assertTrue("CIS" in i.course_code)

  def test_case_desc(self):
    g = parse(0)
    ret = search.search(search.parse_user_input("Show me all courses about \"scottish\" things"), g)
    self.assertTrue(ret is not None)
    self.assertEqual(len(ret), 2)
    for i in ret:
      self.assertTrue("Scottish" in i.description)
